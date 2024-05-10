import { randomBytes } from 'crypto';

// Define a function that returns a Promise
export function generateRandomBytes(size: number): Promise<string> {
  return new Promise((resolve, reject) => {
    randomBytes(size, (err, buf) => {
      if (err) {
        reject(err);
      } else {
        resolve(buf.toString('hex'));
      }
    });
  });
}
