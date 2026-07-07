# Ordem de desenvolvimento

- instalar as dependencias 
- Configirar o tsconfig.json
- Criar o banco de dados
- configurar p .env
- na camada config, fazre o data-source para conectar com o banco, usando as variaveis que estão no env
- na camada model, criar as entidades 
- criar o server e rodar para verificar se tudo está correto e se sobem as tabela. Mais trade ele deve ser editado/aprimorado


### A partir aqui não vamos criar os scripts completos, vamos travbalhando um pouco em cada camada e seguindo adiante


- na  camada repositories, criamos o script de 'create'
- na camada services, tambem fazemos o script de 'create', fazemos as validaçoes , etc..
- Na camada controllers, fazemos o metodo 'create' com req,res, etc.
- ai, configuramos os middlewares 
- depois, fazemos a rota de 'create', que é um POST


- Voltamos ao server, acrescentamos o necessario(EX: app.use(routes), etc...)
- Rodamos o server e testamos a rota post que criamos
- Fazemos ISSO PARA TODAS AS ROTAS, UMA POR UMA


// repositiry -> service, controller -> routes