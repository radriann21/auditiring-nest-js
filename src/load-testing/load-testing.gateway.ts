import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { LoadTestingService } from './load-testing.service';
import { RunLoadTestDto } from './dto/workerData.dto';
import { Logger } from '@nestjs/common';

@WebSocketGateway(3005, { namespace: 'load-testing', cors: '*' })
export class LoadTestingGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(LoadTestingGateway.name);

  handleConnection(client: Socket) {
    this.logger.log(
      `✅ Cliente conectado al namespace /load-testing: ${client.id}`,
    );
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`❌ Cliente desconectado: ${client.id}`);
  }

  constructor(private readonly loadTestingService: LoadTestingService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('load-test')
  async handleStartAudit(
    @MessageBody() data: RunLoadTestDto,
    @ConnectedSocket() client: Socket,
  ) {
    this.server.emit('audit-status', {
      message: 'Iniciando auditoria...',
      progress: 0,
    });

    const result = await this.loadTestingService.loadTest(data, (progress) => {
      client.emit('audit-status', progress);
    });

    client.emit('audit-complete', result);
  }
}
