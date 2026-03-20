/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import autocannon from 'autocannon';
import { parentPort, workerData } from 'node:worker_threads';

function runLoadTest(config) {
  const parsedConfig = typeof config === 'string' ? JSON.parse(config) : config;

  console.log('Worker received parsed config:', parsedConfig);

  const instance = autocannon({
    url: parsedConfig.url,
    connections: parsedConfig.connections,
    duration: parsedConfig.duration,
    followRedirects: parsedConfig.followRedirects ?? true,
    title: 'Load Test',
  });

  instance.on('tick', (stats) => {
    parentPort.postMessage({
      type: 'TICK',
      data: {
        requests: stats.counter,
        bytes: stats.bytes,
      },
    });
  });

  instance.on('done', (result) => {
    parentPort.postMessage({
      type: 'DONE',
      data: result,
    });
  });
}
runLoadTest(workerData);
