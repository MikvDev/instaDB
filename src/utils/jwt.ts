import  jwt from 'jsonwebtoken'
import * as dotenv from "dotenv"

dotenv.config()
 
const { JWT_SECRET, JWT_EXPIRES_IN} = process.env
interface Payload {
    id: number
    email: string
}

export function generateToken(payload: Payload) {
    return jwt.sign(payload, JWT_SECRET!, {
        expiresIn: Number(JWT_EXPIRES_IN)})
}

export function verifyToken(token: string) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET!)
    } catch {
        return null
    }
}


const token = generateToken({id: 1, email: "Miguel@gmail.com"})
console.log(token)

const valido = verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJsZW9AZ21haWwuY29tIiwiaWF0IjoxNzgzNjIxMTk2LCJleHAiOjE3ODM3MDc1OTZ9.1tcs57LN4TxQ9IaWOKo9i1oPmFVuHnOBqUu7SPB4R30")

console.log(valido)
