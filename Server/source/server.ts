import Fastify from 'fastify'
import {PrismaClient} from '@prisma/client'
import cors from '@fastify/cors'

const app = Fastify()
const prisma = new PrismaClient()

//the only setup for CORS (anyone can acess the back-end)
app.register(cors)

app.get('/', async () => {
    const habits = await prisma.habit.findMany()

    return habits
})

app.listen({
    port: 3333
}).then(()=>{
    console.log('Server OK')
})