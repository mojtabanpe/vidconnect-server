import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Room, RoomServiceClient } from 'livekit-server-sdk';
@Injectable()
export class RoomService {
  apiKey = this.configService.get('LK_API_KEY');
  apiSecret = this.configService.get('LK_API_SECRET');
  host = this.configService.get('LK_HOST');
  roomServiceClient: RoomServiceClient;
  constructor(private configService: ConfigService) {
    this.roomServiceClient = new RoomServiceClient(
      this.host,
      this.apiKey,
      this.apiSecret,
    );
  }

  createRoom(roomName: string): Promise<Room> {
    const opts = {
      name: roomName,
      emptyTimeout: 60 * 60, // 60 minutes
      maxParticipants: 20,
    };
    console.log('oomad');
    return this.roomServiceClient.createRoom(opts);
  }

  async getRoom(roomName: string): Promise<Room> {
    const rooms = await this.roomServiceClient.listRooms();
    const room = rooms.find((r) => r.name === roomName);
    return new Promise((resolve) => {
      resolve(room);
    });
    return room;
  }

  listRooms(): Promise<Room[]> {
    return this.roomServiceClient.listRooms();
  }

  deleteRoom(roomName: string): Promise<void> {
    return this.roomServiceClient.deleteRoom(roomName);
  }
}
