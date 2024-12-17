import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Options,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //If we like to be specific for a particular case
  //@Options({
  //  origin: 'http://localhost:5173', // Override the global settings if needed
  //  methods: ['POST'],              // Restrict to just POST for this endpoint
  //  allowedHeaders: ['Content-Type', 'Authorization'] // Additional headers
  //})

  @Options() // Handle OPTIONS requests for CORS preflight. nestjs mostly handles what to return
  handleOptions() {
    return {}; // Just return an empty object - NestJS will add the necessary headers
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log('Creating new user...');
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
}
