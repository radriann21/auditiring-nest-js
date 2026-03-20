import type { Histogram } from 'autocannon';

export interface LoadTestSummary {
  targetUrl: string;
  timestamp: string;
  duration: number;
  totalRequests: number;
  totalBytes: string;

  averageRequestsPerSec: number;
  averageLatencyMs: number;
  maxLatencyMs: number;

  successCount: number;
  errorCount: number;
  timeoutCount: number;

  statusCodes: Record<string, number>;

  isResilient: boolean;
}

export interface AutocannonRawResult {
  url: string;
  connections: number;
  duration: number;
  totalCompletedRequests: number;
  totalRequests: number;
  totalBytes: number;
  samples: number;
  errors: number;
  timeouts: number;
  mismatches: number;
  non2xx: number;
  resets: number;
  start: Date;
  finish: Date;
  latencies: Histogram;
  requests: Histogram;
  throughput: Histogram;

  statusCodeStats: Record<string, { count: number }>;
  '1xx': number;
  '2xx': number;
  '3xx': number;
  '4xx': number;
  '5xx': number;
}

export interface TickMessage {
  type: 'TICK';
  data: {
    requests: number;
    bytes: number;
  };
}

export interface DoneMessage {
  type: 'DONE';
  data: AutocannonRawResult;
}

export type WorkerMessage = TickMessage | DoneMessage;
