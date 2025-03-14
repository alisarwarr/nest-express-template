import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
      @WebSocketServer()
      server: Server;

      handleConnection(socket: Socket): void {
            console.log(`connected: ${socket.id}`);
      }

      handleDisconnect(socket: Socket): void {
            console.log(`disconnect: ${socket.id}`);
      }
}