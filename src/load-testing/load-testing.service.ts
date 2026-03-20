import { Injectable } from '@nestjs/common';
import { Worker } from 'worker_threads';
import { RunLoadTestDto } from './dto/workerData.dto';
import { WorkerMessage, LoadTestSummary } from './interfaces/interfaces';
import { transformResult } from '../common/utils/loadResultTransform';

@Injectable()
export class LoadTestingService {
  async loadTest(
    config: RunLoadTestDto,
    onProgress: (requests: number) => void,
  ): Promise<LoadTestSummary> {
    return new Promise<LoadTestSummary>((resolve, reject) => {
      const worker = new Worker(__dirname + '/workers/loadTest.worker.js', {
        workerData: config,
      });

      worker.on('message', (message: WorkerMessage) => {
        if (message.type === 'TICK') {
          onProgress(message.data.requests);
        } else if (message.type === 'DONE') {
          resolve(transformResult(message.data, config.url));
        }
      });

      worker.on('error', reject);
    });
  }
}
