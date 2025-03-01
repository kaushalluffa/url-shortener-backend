import { FastifySchema } from "fastify"
import { email, name, password } from "../common.js"


const registerResponseProperties = {
    message: { type: 'string' }
}
export const registerSchema: FastifySchema = {
    body: {
        type: 'object',
        properties: {
            email,
            password,
            name
        },
        required: ['email', 'password', 'name'],
    },
    response: {
        201: {
            type: 'object',
            properties: registerResponseProperties,
        },
        500: {
            type: 'object',
            properties: registerResponseProperties,
        },
        400: {
            type: 'object',
            properties: registerResponseProperties,
        }
    },
    
}
