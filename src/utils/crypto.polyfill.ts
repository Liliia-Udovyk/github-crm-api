/**
 * This file polyfills the Web Crypto API for Node.js environments.
 * Required because some libraries (e.g., TypeORM) expect `globalThis.crypto`
 * to be available, especially for `crypto.randomUUID()` and `subtle` APIs.
 */

import * as nodeCrypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

// If global crypto is not defined, create a polyfill
if (!globalThis.crypto) {
  globalThis.crypto = {
    /**
     * Fills the passed array with cryptographically strong random values.
     * Used internally by `randomUUID()` and other cryptographic operations.
     *
     * @param {ArrayBufferView} arr - The array to fill with random values
     * @returns {ArrayBufferView} The filled array
     */
    getRandomValues: (arr: ArrayBufferView): ArrayBufferView =>
      nodeCrypto.randomFillSync(arr as NodeJS.ArrayBufferView),

    /**
     * Optional: exposes the `subtle` crypto API if available (Node.js 15+).
     * This API provides cryptographic primitives such as digest, sign, verify, etc.
     */
    subtle: nodeCrypto.webcrypto?.subtle || undefined,

    /**
     * Polyfill for `randomUUID` if not available natively.
     * Generates RFC4122 version 4 UUIDs.
     *
     * @returns {string} A randomly generated UUID string
     */
    randomUUID: nodeCrypto.randomUUID
      ? nodeCrypto.randomUUID.bind(nodeCrypto)
      : () => uuidv4(),
  } as Crypto;
} else if (!('randomUUID' in globalThis.crypto)) {
  /**
   * Polyfill `randomUUID` method if it doesn't exist in the existing global crypto.
   */
  (globalThis.crypto as any).randomUUID = nodeCrypto.randomUUID
    ? nodeCrypto.randomUUID.bind(nodeCrypto)
    : () => uuidv4();
}
