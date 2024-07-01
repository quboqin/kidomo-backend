import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { retryAttempts: 5, retryDelay: 3000 }
  })

  await app.startAllMicroservices()
  await app
    .listen(process.env.PORT)
    .then(() => console.log(`Microservice is listening on port ${process.env.PORT}`))
}
bootstrap()
