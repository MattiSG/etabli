import { minutesToMilliseconds } from 'date-fns/minutesToMilliseconds';
import createHttpError from 'http-errors';
import { NextApiRequest } from 'next';

import { promiseTimeoutError } from '@etabli/src/models/entities/errors';

const maintenanceApiKey = process.env.MAINTENANCE_API_KEY;

export function isAuthenticated(apiKeyHeader?: string): boolean {
  // If the maintenance api key is not defined on the server we prevent executing operations
  return !!maintenanceApiKey && maintenanceApiKey === apiKeyHeader;
}

// Check the originator has the maintenance secret
export function assertMaintenanceOperationAuthenticated(req: NextApiRequest) {
  if (!isAuthenticated((req.headers as any)['x-api-key'])) {
    console.log('someone is trying to trigger a maintenance operation without being authenticated');

    throw new createHttpError.Unauthorized(`invalid api key`);
  }
}

export function promiseWithFatalTimeout<T>(promise: Promise<T>, traceIdentifier: string, timeout?: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => {
        console.error(`the promise identified as "${traceIdentifier}" has not completed within the expected timeout`);

        reject(promiseTimeoutError);
      },
      timeout || minutesToMilliseconds(5)
    );

    promise
      .then((result) => {
        clearTimeout(timer);

        resolve(result);
      })
      .catch((error) => {
        clearTimeout(timer);

        reject(error);
      });
  });
}
