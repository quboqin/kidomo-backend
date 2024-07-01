import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { MATH_SERVICE } from 'math/src/app.constants'

@Injectable()
export class AppService {
  constructor(@Inject(MATH_SERVICE) private readonly client: ClientProxy) {}

  async getHello(): Promise<string> {
    const pattern = { cmd: 'sum' }
    const payload = [1, 2, 3]
    const result = await this.client.send<number>(pattern, payload)
    return `Hello World!, Sum = ${result}`
  }
}
