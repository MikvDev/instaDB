import { User } from "../models/User";
export function omitPassword(user:User){

    // Copiamos o valor da senha do user para a variavel password
    // ai, o resto (id, nome, email) ficaq dentro da variavel rest

    // e é ela quer retornaos 
    const {password, ...rest} = user;
    return rest;

}