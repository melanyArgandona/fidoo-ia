import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async handleMessage(@Body('message') message: string) {
    const response = await this.chatService.getChatResponse(message);
    return { reply: response };
  }
}
