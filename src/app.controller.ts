import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('get-token')
  getToken(@Body() body: any): Promise<any> {
    return this.appService.getToken(body.room_name, body.participant_name);
  }
}
