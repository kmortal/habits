import Fastify from "fastify"
import cors from '@fastify/cors'
import { appRoutes } from "./routes"

const app = Fastify()

app.register(cors)
app.register(appRoutes)

app.listen(
    {
        host: '192.168.141.214',
        port: 3333
    })
    .then(() => {
        console.log('Server OK')
    })