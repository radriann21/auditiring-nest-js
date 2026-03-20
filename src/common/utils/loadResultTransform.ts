import { LoadTestSummary } from '../../load-testing/interfaces/interfaces';
import { AutocannonRawResult } from '../../load-testing/interfaces/interfaces';

export const transformResult = (
  raw: AutocannonRawResult,
  url: string,
): LoadTestSummary => {
  const mappedStatusCodes: Record<string, number> = {};

  Object.entries(raw.statusCodeStats).forEach(([code, data]) => {
    mappedStatusCodes[code] = data.count;
  });

  return {
    targetUrl: url,
    timestamp: new Date().toISOString(),
    duration: raw.duration,
    totalRequests: raw.totalRequests,
    totalBytes: (raw.totalBytes / 1024 / 1024).toFixed(2) + ' MB',

    averageRequestsPerSec: raw.requests.average,
    averageLatencyMs: raw.latencies.average,
    maxLatencyMs: raw.latencies.max,

    successCount: raw['2xx'] || 0,
    errorCount: raw.errors,
    timeoutCount: raw.timeouts,

    statusCodes: mappedStatusCodes,
    isResilient: (raw['2xx'] + raw['3xx']) / raw.totalRequests > 0.9,
  };
};
