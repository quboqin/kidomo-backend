import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { ConfigModule } from '@nestjs/config'
import { MATH_SERVICE } from './math.constants'
import { MathController } from './math.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ClientsModule.register([{ name: MATH_SERVICE, transport: Transport.TCP }])
  ],
  controllers: [MathController]
})
export class MathModule {}
