import { Controller, Delete, Get, Param } from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from 'livekit-server-sdk';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get(':name')
  getRoom(@Param('name') name: string): Promise<Room> {
    return this.roomService.getRoom(name);
  }

  @Get('create/:name')
  createRoom(@Param('name') name: string): Promise<Room> {
    return this.roomService.createRoom(name);
  }

  @Get('')
  listRooms(): Promise<Room[]> {
    return this.roomService.listRooms();
  }

  @Delete(':name')
  deleteRoom(@Param('name') name: string): Promise<void> {
    return this.roomService.deleteRoom(name);
  }
}
