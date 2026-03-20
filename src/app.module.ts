import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScanHeadersModule } from './scan-headers/scan-headers.module';
import { LoadTestingModule } from './load-testing/load-testing.module';

@Module({
  imports: [ScanHeadersModule, LoadTestingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
