import { Module } from '@nestjs/common';
import { LoadTestingService } from './load-testing.service';
import { LoadTestingGateway } from './load-testing.gateway';

@Module({
  controllers: [],
  providers: [LoadTestingService, LoadTestingGateway],
  exports: [LoadTestingService],
})
export class LoadTestingModule {}
