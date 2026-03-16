import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { FLAT_HEADERS_LIBRARY } from 'src/common/constants/HEADERS';
import axios from 'axios';

export interface AnalysisResult {
  header: string;
  description: string;
  actualValue?: string | string[];
  expectedValue?: string | string[];
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
}

@Injectable()
export class ScanHeadersService {
  private readonly logger = new Logger(ScanHeadersService.name);

  async analyzeHeaders(url: string): Promise<AnalysisResult[]> {
    try {
      const response = await axios.head(url);
      const headers = response.headers;
      const result: AnalysisResult[] = [];

      // CHECK EXISTING HEADERS
      Object.entries(headers).forEach(([key, value]) => {
        // CHECK THE EXISTENCE OF THE HEADER AND CHECK THAT THE SECURE VALUE IS NULL
        // IF IT'S SHOULD NOT BE PRESENT
        if (
          FLAT_HEADERS_LIBRARY[key] &&
          FLAT_HEADERS_LIBRARY[key].secureValue === null
        ) {
          result.push({
            header: key,
            actualValue: value as string,
            expectedValue: 'HEADER NOT PRESENT',
            description: FLAT_HEADERS_LIBRARY[key].description,
            severity: FLAT_HEADERS_LIBRARY[key].severity,
          });
        }

        // CHECK THE EXISTENCE OF THE HEADER AND CHECK THE SECURE VALUE IS AN STRING ARRAY
        // IF IT'S SHOULD HAVE AT LEAST ONE VALUE FROM THE ARRAY
        if (
          FLAT_HEADERS_LIBRARY[key] &&
          Array.isArray(FLAT_HEADERS_LIBRARY[key].secureValue)
        ) {
          const receivedValues = (value as string)
            .split(/[,;]/)
            .map((v) => v.trim());
          const secureValues = FLAT_HEADERS_LIBRARY[key].secureValue;

          if (
            !secureValues.some((secureValue) =>
              receivedValues.includes(secureValue),
            )
          ) {
            result.push({
              header: key,
              actualValue: value as string,
              expectedValue: secureValues,
              description: FLAT_HEADERS_LIBRARY[key].description,
              severity: FLAT_HEADERS_LIBRARY[key].severity,
            });
          }
        }

        // CHECK THE EXISTENCE OF THE HEADER AND CHECK THE SECURE VALUE IS A STRING
        // IF IT'S SHOULD BE EQUAL TO THE SECURE VALUE OR AT LEAST ONE IF IT'S A ARRAY OF VALUES
        if (
          FLAT_HEADERS_LIBRARY[key] &&
          typeof FLAT_HEADERS_LIBRARY[key].secureValue === 'string'
        ) {
          const expectedValues = FLAT_HEADERS_LIBRARY[key].secureValue
            .split(/[,;]/)
            .map((v) => v.trim());
          const actualValues = (value as string)
            .split(/[,;]/)
            .map((v) => v.trim());
          const hasAtLeastOneExpectedValue = actualValues.some((actualValue) =>
            expectedValues.includes(actualValue),
          );

          if (!hasAtLeastOneExpectedValue) {
            result.push({
              header: key,
              actualValue: value as string,
              expectedValue: expectedValues,
              description: FLAT_HEADERS_LIBRARY[key].description,
              severity: FLAT_HEADERS_LIBRARY[key].severity,
            });
          }
        }
      });

      // CHECK MISSING HEADERS
      Object.entries(FLAT_HEADERS_LIBRARY).forEach(([key, value]) => {
        if (!headers[key] && value.secureValue !== null) {
          result.push({
            header: key,
            actualValue: 'MISSING',
            expectedValue: value.secureValue as string,
            description: value.description,
            severity: value.severity,
          });
        }
      });

      return result;
    } catch (error) {
      this.logger.error('Error al analizar los headers', error);
      throw new InternalServerErrorException('Error al analizar los headers');
    }
  }
}
