import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Transport, ClientsModule } from '@nestjs/microservices'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { MATH_SERVICE } from '../math/src/app.constants'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true // makes the module globally available
    }),
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
