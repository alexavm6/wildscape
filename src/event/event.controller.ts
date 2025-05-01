import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  // @Post()
  // create(@Body() createEventDto: CreateEventDto) {
  //   return this.eventService.create(createEventDto);
  // }

  @Get()
  async findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseMongoIdPipe) id: string) {
    return this.eventService.findById(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
  //   return this.eventService.update(+id, updateEventDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.eventService.remove(+id);
  // }
}
