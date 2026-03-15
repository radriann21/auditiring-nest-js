import { Module } from '@nestjs/common';
import { ScanHeadersService } from './scan-headers.service';
import { ScanHeadersController } from './scan-headers.controller';
import { Logger } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ScanHeadersController],
  providers: [ScanHeadersService, Logger],
})
export class ScanHeadersModule {}
