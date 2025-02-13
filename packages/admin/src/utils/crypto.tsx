import { z } from 'zod';

type CryptoAlgorithm = 'AES-GCM' | 'AES-CBC' | 'AES-CTR';

const stringSchema = z.string();

class DataEncryptionManager {
    private algorithm: CryptoAlgorithm;
    private readonly key_path = '__lks_Rt56_cfG56';
    private readonly iv_path = '__Sr4_Fg346_cfe45g6';
    private readonly _defaul_key_prefix = '_045_dfgHj_poL_';

    constructor(algorithm: CryptoAlgorithm) {
        this.algorithm = algorithm;
    }

    get prefix() {
        return this._defaul_key_prefix;
    }

    async generateKey() {
        const generatedKey = await window.crypto.subtle.generateKey(
            {
                name: this.algorithm,
                length: 256,
            },
            true,
            ['encrypt', 'decrypt'],
        );
        const exportedKey = await window.crypto.subtle.exportKey(
            'jwk',
            generatedKey,
        );
        const base64Key = btoa(JSON.stringify(exportedKey));
        localStorage.setItem(this.key_path, base64Key);
    }

    async generateIV() {
        const iv = window.crypto.getRandomValues(new Uint8Array(12));
        const base64IV = btoa(String.fromCharCode(...iv));
        localStorage.setItem(this.iv_path, base64IV);
    }

    async getIv() {
        let ivRaw = localStorage.getItem(this.iv_path);
        if (!ivRaw) {
            await this.generateIV();
            ivRaw = localStorage.getItem(this.iv_path);
        }
        const ivArray = Uint8Array.from(atob(ivRaw!), (char) => char.charCodeAt(0));
        return ivArray;
    }
    private async getKey() {
        let rawKey = localStorage.getItem(this.key_path);
        if (!rawKey) {
            await this.generateKey();
            rawKey = localStorage.getItem(this.key_path);
        }
        const decodedKey = JSON.parse(atob(rawKey!));
        const key = await window.crypto.subtle.importKey(
            'jwk',
            decodedKey,
            { name: this.algorithm },
            true,
            ['encrypt', 'decrypt'],
        );
        return key;
    }

    public async encrypt(data: string) {
        const key = await this.getKey();
        const iv = await this.getIv();

        const encodedData = new TextEncoder().encode(data);

        const encryptedData = await window.crypto.subtle.encrypt(
            {
                name: this.algorithm,
                iv,
            },
            key,
            encodedData,
        );

        const base64EncryptedData = btoa(
            String.fromCharCode(...new Uint8Array(encryptedData)),
        );
        return {
            data: base64EncryptedData,
            iv: btoa(String.fromCharCode(...iv)),
        };
    }

    public async decrypt(encryptedData: string, iv: Uint8Array) {
        const key = await this.getKey();

        const encrypedBuffer = Uint8Array.from(atob(encryptedData), (char) =>
            char.charCodeAt(0),
        );

        const decryptedData = await window.crypto.subtle.decrypt(
            {
                name: this.algorithm,
                iv,
            },
            key,
            encrypedBuffer,
        );

        return new TextDecoder().decode(decryptedData);
    }
}

export class SecureStorage {
    private _crypto: DataEncryptionManager;
    private _storage: Storage;

    constructor() {
        this._crypto = new DataEncryptionManager('AES-GCM');
        this._storage = localStorage;
    }

    get prefix() {
        return this._crypto.prefix;
    }

    getKey(key: string) {
        return `${this.prefix}_${key}`;
    }

    async setItem(key: string, value: string) {
        if (!stringSchema.safeParse(value)) {
            throw new Error('Value must be a string');
        }
        /**
         * _ - iv
         * __k - encrypted data
         */
        const { data: __k, iv: _ } = await this._crypto.encrypt(value);
        this._storage.setItem(this.getKey(key), JSON.stringify({ _, __k }));
    }

    async getItem(key: string) {
        const item = this._storage.getItem(this.getKey(key));
        if (!item) {
            return null;
        }

        /**
         * _ - iv
         * __k - encrypted data
         */
        const { _, __k } = JSON.parse(item);
        return this._crypto.decrypt(
            __k,
            Uint8Array.from(atob(_), (char) => char.charCodeAt(0)),
        );
    }

    async removeItem(key: string) {
        this._storage.removeItem(this.getKey(key));
    }

    // async clear() {
    //     this._storage.clear();
    // }

    async setUnencryptedItem(key: string, value: string) {
        if (!stringSchema.safeParse(value)) {
            throw new Error('Value must be a string');
        }
        this._storage.setItem(this.getKey(key), value);
    }

    async getUnencryptedItem(key: string) {
        return this._storage.getItem(this.getKey(key));
    }
}

export const secureStorage = new SecureStorage();
