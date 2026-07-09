import bcrypt from "bcrypt";

import { UserRepository } from "../repositories/UserRepository";
import { omitPassword } from "../utils/omitPassword";
// Aqui estamos criadno uma classe de erro
export class NotFoundError extends Error {}

// A camada Service é resposavel por chamar os metodos de repository e cuidar das validações das nossas regras de negocio (Ex: Um usuario precisa ter meial valido, etc...)
export const UserService = {
  async listAll() {
    return UserRepository.findAll();
  },
  async GetById(id: number) {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new NotFoundError("Usuario não encontrado!");
    }
    // Se encontrou, não cai no 'if ali em cima, então podemos usar o return para retornar um usuario

    return user;
  },

  async Create(data: { name: string; email: string; password: string }) {
    // gera uma senha criptografada
    const hashesPassword = await bcrypt.hash(data.password, 10); // hash forte

    const user  = await UserRepository.create({
      name: data.name,
      email: data.email,
      password: hashesPassword,
    });
    return omitPassword(user)
  },
  async Update(id: number, data: {name?: string, email?: string, password?: string}){
    const user = await UserRepository.findById(id)

    if(!user) throw new NotFoundError('Usuario não encontrado')
    
    if(data.name) user.name = data.name;
    if(data.email) user.email = data.email;
    if(data.password) user.password = await bcrypt.hash(data.password, 10)
    
    const updatedUser = await UserRepository.create(user)
    return omitPassword(updatedUser);  
  },
  async Delete(id: number){
    
    const user = await UserRepository.delete(id)
    if (user.affected === 0) {
      throw new NotFoundError("usuario não encontrado!")
    }//2

  },
  async Login(data: {email: string, password: string}){
      // Verificamos se o email existe 
    // Precimaos do await já que o metodo findByEmail() é async 
    const user = await UserRepository.findById(data.email)

    
    // Verifica se a sneha esta correta
    // data.password pega a senha que enviamos como parametro
    // user.password pega a senha que está no objeto user, que é usuário que encontramos com o metodo findbyEmail, que retorna um user
    const isValid = await bcrypt.compare(data.password, user.password)

    // Note que não diferencimaos para proteger contra possiveis invasões 
    if(!user || !password) throw new NotFoundError("Informações incorretas!")

  }
};
