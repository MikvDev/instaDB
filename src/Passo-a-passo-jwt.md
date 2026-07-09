# O que é o JWT? O que significa? Onde ele habita? Descubra hoje no globo reporter!

JWT siginica jason Web Token. ELe é um codigo gerado e salvo no navegador que, entre outras coisas, guarda as informações de um usuário (exemplo: `{id: 1, email: "teste@gmail.com"}`)

Como ele se parece? Ele se parece com isso aqui:

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhbGljZUBtYWlsLmNvbSJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`

Para que ele serve? Ele serve para guardar informações de qual usuário está logado. Assim, nós podemos fazer requisições(exemplo, criar um post) sem pedir para que logue novamente toda vez. Também podemos garantir que um usuário crie, atualiza, delete posts APENAS PARA SI MESMO ou seja apenas SUAS informações e não a de outro, etc...

Por exemplo: Vamos pensar no funcionamento de uma rede social. Imagine que você acessa o instagram e quer criar um post. Você primeiro precisa ter uma conta e logar com ela. Nós usamos o jwt justamente para fazer isso: Logar. Outra coisa, você só consegue criar posts para SI MESMO. Não há como criar ou deletar, por exemplo, o post de outro usuário. O JWT também garante isso, pois ele informa qual o id do usuário que está logado.


O TOKEN em si é divido em 3 partes . As mais importantes para nós são as duas ukltimas: O payload e o signature. 

O payload é a parte do meio.É ali que fica armazenado as informações com id e email do usuário.

O Signature é a terceira parte. Ali fica armazenado o "segrado", que é um código que cada sistema tem e seu. Ele garante  que aquele token pertence aquele sistema. Se for modificado, por exemplo, ele é invalido. Isso evita que uma pessoa pegue qualquer token  e tente usar em nosso sistema.

Como utilizar ao nosso projeto? Vamo lá:

1- Primeiro é preciso instalar as dependências

 ```bash
npm install jsonwebtoken @types/josenwebtoken
```
2 - Para usarmos o JWT, agora vamos criar um arquivos chamado `jwt.ts` dentro da pasta `utils`.

Dentro deste arquivo, precisamos então:

2.1 - importar tudo que é necessário: O JWT e também o dotenv(pois teremos variáveis importantes lá)
```ts
    import jwt from 'jasonwebtoken'
    import * as dotenv from 'dotenv'
```

2.2 - Precisamos carregar as variaveis do .env para o objeto process.env (ele é quem nos fornece os valores depois)


```ts 
dotenv.config() // sem isso, não temos acesso as variaveis dop .env
// use sempre o mesmo nome e mesma ordem que estão no .env

const {JWT_SECRET, JWT_EXPIRES_IN} = process.env
```


2.3 - No .env, precisamos ter variáveis correspondentes:


```ts

DB_HOST = locashost
DB_PORT = 3306
DB_USER = root
DB_PWD = root
DB_NAME = insta_db

PORT = 3000

// Essas sãs as novas variaveis de ambiente

JWT_SECRET = minhaChaveSecreta // serve para converter depois na assinatura do token (signature)
JWT_EXPORT_IN = 86400 // identifica por quanto tempo o token é valido 

```
2.4 - Voltando ao arquivo jwt.ts, vamos criar uma interface chamada Payload para que nós esperamos que nosso token receba: 

```ts
interface Payload {
    id: number
    email: string
}
```
2.5 - Agora, vamos criar uma função que gera um novo token. Geralmente, chamamos esse método dentro de uma função login, etc..


```ts
// Nunca se esqueça do 'export' ou não poderemos usar está função em outros arquivos
// Nosso método recebe por parametro um objeto que deve ter id e email(por causa da nossa inteface)
const function generateTokrn(payload: Payload){
    // o metodo sign() da biblioteca do jwt serve para criar um novo token.
    // Para isso, passamos para ele, nesta ordem: 
    // 1 - o payload com as informações do usuário
    // 2 - O  `segredo` que está no JWT_SECRET
    // 2 - Um objeto(ou seja, outra 'chaves': {} que contém a opção 'expiresIn', com o valor de JWT_EXPIRES_IN. Atenção: Se estiver no .env algo como 'JWT_EXPIRES_IN = 86400', sign() você precisa chama-lo dentro de Number(), para converte-lo
    return jwt.sign(payload, JWT_SECRET!, {
        expiresIn: Number(JWT_EXPIRES_IN)
    })
    // O argumnto com o JWT_SECRET tem um '!', no final pois o Typescript sabe que pode ser que o .env não tenha essa informação . Ao colocar o ponto de exclamação, é como se dissémos: "tem sim, confia!"
}
```

2.6 - Criamos a função que gera o  token. Agora vamos criar a funçãoque analisa se ele é válido ou não: 

```ts
export function verifyToken(token: string){
    try {
        // chamamos a função verify() da biblioteca jwt para fazer a verfiricação
        // O primeiro argumento é o própio token
        // O segundo é o JWT_SECRET
        // Se for válido, a função retorna as informações do usuario
        return jwt.verify(token, JWT_SECRET!) 
    }catch {
        // Se não for retorna nulo 
        return null
    }
}

```
EXTRA: Se quiser testar, no mesmo arquivos você pode chamar os dois métodos, primeiro o generate e depois o verify: 

```ts
// gere um token com infos que quiser
const token = generaToken({id: 1, email: "leo@gmail.com"})
console.log(token)

// Depois, confira se i token é valido(Se for o token que acabamos de gerar, sempre vai ser válido)
const tokenValido = verifyToken(token)
console.log(tokenValido) // Se mostrar as infos do usuario o token é valido, se não for mostra null

``` 
Depoi, rode com o comando:

```bash
ts-node-dev src/utils/jwt.ts

```

PASSO 3 - Se não tivermos uma função que procura por email no Userrepository, precismaos criá-la. Se já tem, podemos pular esta etapa. vá até UserRepository e adiciona e a seguinte função:

```ts 
async findbyId(email: string){
    // findOne() é uma função do typeORM que retorna u unico resultado (se usássemos apenas find() ele retorna um Array!)
    return repo.findOne({where: email})

}

```

PASSO 4 - Na camada Service, vamos precisar adicionar mais algumas coisas.

4.1 - Adicionar uma extensão da classe 'error' que vamos dar o nome de "UnauthorizedError' . Adicione a segunnte linha em 'Userservice.ts'

```ts
// Não é obrigatorio criar essa classe filha de error. Porem, ao fazermos isso, quandi este erro for laçadom sabemos exatamente do que se trata
export class UnauthorizedError extends Error {}

```

4.2 - Vamos adicionar o método de login dentro de 'UserService.ts'. Este método vai receber um email e uma senha, validar se existe o email usando o 'UserRepository.findByEmail()' que criamos há pouco, depois valida atraés do método bcrypt.compare() se a senha bate com a criptografia dela do banco, e, se tudo estiver de acordo, ai sim gera um token chamado o metodo 'jwt.generateToken()' que nós criamos antes. Então, no arquivo 'UserService.ts' crie:


```ts 
async login(data: {email: string, password: string}){

    // Verificamos se o email existe 
    // Precimaos do await já que o metodo findByEmail() é async 
    const user = await UserRepository.findByEmail(data.email)

    
    // Verifica se a sneha esta correta
    // data.password pega a senha que enviamos como parametro
    // user.password pega a senha que está no objeto user, que é usuário que encontramos com o metodo findbyEmail, que retorna um user
    const isValid = await bcrypt.compare(data.password, user.password)

    // Note que não diferencimaos para proteger contra possiveis invasões 
    if(!user || !password) throw new NotFoundError("Informações incorretas!")

    const token = jwt.generateToken({
        user.id, user.email
    })
    console.log(token)
    return {
        user: omitPassword(user), // Chamamos este metodo que criamos anteriormente, a senha do user não aparece na resposta do servidor(importante!)
        token
    }
}

```

PASSO 5 - Agora, depois de services, vamos para a camada controllers, onde vamos criar um arquivo chamado "Authcontroller.ts" ele ficara responsavel pela parte de login. Dentro dele, insira:

5.1  - As importações:

```ts
import {Request, Response, NextFunction} from ''
import {UserService} from '../service/UserService.ts'
```
5.2 - O método de login:
```ts
export class AuthController {
    async login(req: Request, res: Response, next: NextFunction){
        try {
            const {email, password} = req.body // Memsa ordem e nomes
            const result = await UserService.login({email, password})
            return res.status(200).json(result)
        }catch(Error){
            next(error) // Captura qualquer erro que for lançado pra o proximo 
        }
    }
}

```
PASSO 6 - Agora, precimos criar a rota do auth. Porem , ao contrário do que fazíamos antes, não vamos por todas as rotas em um arquivo. Vamos dividi-las entre: Rotas de auth, rotas de user,rotas de post e ai um arquivo principal que reúne todas elas. vamos lá:
6.1 - Em 'routes', crie um arquivo chamado "auth.router.ts". Dentro dele, coloque as importações
```ts
import {Router} from "express"
import {authController} from "../controller/AuthController"
```


6.2 - Crie o objeto router e o authcontroller:

```ts
    const router = Router() // Objeto do router do express (Ele) nos permite acessar os metodos para criar as rotas
    const authCOntroller = new AuthController() // objeto da classe authcontroller
```
6.3 - Criamos a rota: 

```ts
    router.post("/login", authController.login.bind(authController))
    export default router
```

6.4 - Agora preciamos ir até index.ts e chamar as rotas de auth lá:
```ts
import authRouter from "./auth.routes"
const router = Router()
router.use("/auth", authRoutes)
export default router
```