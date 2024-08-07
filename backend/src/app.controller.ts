import { Controller, Get } from '@nestjs/common';
import { Public } from './admin/auth/public.decorator';

@Controller()
export class AppController {
  @Public()
  @Get()
  getHome(): string {
    return 'Newspaper REST Service!';
  }
}
