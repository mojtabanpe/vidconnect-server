import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AccessToken } from 'livekit-server-sdk';
@Injectable()
export class AppService {
  apiKey = this.configService.get('LK_API_KEY');
  apiSecret = this.configService.get('LK_API_SECRET');
  constructor(private configService: ConfigService) {}

  getToken(roomName: string, participantName: string): Promise<any> {
    const at = new AccessToken(this.apiKey, this.apiSecret, {
      identity: participantName,
    });
    at.addGrant({ roomJoin: true, room: roomName });

    return new Promise((resolve) => {
      resolve({
        access_token: at.toJwt(),
      });
    });
  }
}
