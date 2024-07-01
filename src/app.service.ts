import { Inject, Injectable } from '@nestjs/common'
import { Client, ClientProxy, Transport } from '@nestjs/microservices'

@Injectable()
export class AppService {
  @Client({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: parseInt(process.env.MATH_PORT, 10) || 3001
    }
  })
  private client: ClientProxy

  async getHello(): Promise<string> {
    const payload = [1, 2, 3]
    const result = await this.client.send<number>({ cmd: 'sum' }, payload).toPromise()
    return `Hello World!, Sum = ${result}`
  }
}
