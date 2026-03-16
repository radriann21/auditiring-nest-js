import { Controller, Post, Body } from '@nestjs/common';
import { ScanHeadersService } from './scan-headers.service';

@Controller('scan-headers')
export class ScanHeadersController {
  constructor(private readonly scanHeadersService: ScanHeadersService) {}

  @Post()
  analyzeHeaders(@Body() body: { url: string }) {
    return this.scanHeadersService.analyzeHeaders(body.url);
  }
}
