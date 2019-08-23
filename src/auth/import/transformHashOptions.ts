import { GoogleHashOptions, HashOptions } from '../types';
import { toWebSafeBase64 } from './toWebSafeBase64';

export function transformHashOptions(options: HashOptions): GoogleHashOptions {
    if (!options.hashAlgo) {
        return {};
    }

    const hashAlgo = options.hashAlgo.toUpperCase();
    switch (hashAlgo) {
        case 'HMAC_SHA512':
        case 'HMAC_SHA256':
        case 'HMAC_SHA1':
        case 'HMAC_MD5':
            if (!options.hashKey || options.hashKey === '') {
                throw new Error(
                    `Must provide hash key(base64 encoded) for hash algorithm ${hashAlgo}`
                );
            }
            return {
                hashAlgorithm: hashAlgo,
                signerKey: toWebSafeBase64(options.hashKey)
            };

        case 'MD5':
        case 'SHA1':
        case 'SHA256':
        case 'SHA512':
        case 'PBKDF_SHA1':
        case 'PBKDF2_SHA256':
            if (
                !options.rounds ||
                options.rounds < 0 ||
                options.rounds > 30000
            ) {
                throw new Error(
                    `Must provide valid rounds(0..30000) for hash algorithm ${hashAlgo}`
                );
            }
            return { hashAlgorithm: hashAlgo, rounds: options.rounds };

        case 'SCRYPT':
            if (!options.hashKey || options.hashKey === '') {
                throw new Error(
                    `Must provide hash key(base64 encoded) for hash algorithm ${hashAlgo}`
                );
            }
            if (!options.rounds || options.rounds <= 0 || options.rounds > 8) {
                throw new Error(
                    `Must provide valid rounds(1..8) for hash algorithm ${hashAlgo}`
                );
            }
            if (
                !options.memCost ||
                options.memCost <= 0 ||
                options.memCost > 14
            ) {
                throw new Error(
                    `Must provide valid memory cost(1..14) for hash algorithm ${hashAlgo}`
                );
            }
            return {
                hashAlgorithm: hashAlgo,
                signerKey: toWebSafeBase64(options.hashKey),
                saltSeparator: toWebSafeBase64(options.saltSeparator || ''),
                rounds: options.rounds,
                memoryCost: options.memCost
            };

        case 'BCRYPT':
            return { hashAlgorithm: hashAlgo };

        case 'STANDARD_SCRYPT':
            return {
                hashAlgorithm: hashAlgo,
                cpuMemCost: options.memCost,
                parallelization: options.parallelization,
                blockSize: options.blockSize,
                dkLen: options.dkLen
            };

        default:
            throw new Error(`Unsupported hash algorithm ${hashAlgo}`);
    }
}
