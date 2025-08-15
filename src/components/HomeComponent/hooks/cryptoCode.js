const encoder = new TextEncoder();
const decoder = new TextDecoder();

const IV_LENGTH = 12;
const SALT_LENGTH = 16;

function base64UrlEncode(data) {
    return btoa(String.fromCharCode(...data))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

function base64UrlDecode(data) {
    const base64 = data.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const binary = atob(padded);
    return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

// GZIP Compression using native CompressionStream
async function gzipCompress(input) {
    const cs = new CompressionStream("gzip");
    const writer = cs.writable.getWriter();
    writer.write(encoder.encode(input));
    writer.close();
    const compressed = await new Response(cs.readable).arrayBuffer();
    return new Uint8Array(compressed);
}

// GZIP Decompression using native DecompressionStream
async function gzipDecompress(compressed) {
    const ds = new DecompressionStream("gzip");
    const writer = ds.writable.getWriter();
    writer.write(compressed);
    writer.close();
    const decompressed = await new Response(ds.readable).arrayBuffer();
    return decoder.decode(decompressed);
}

async function deriveKey(password, salt) {
    const baseKey = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveKey"]);
    return crypto.subtle.deriveKey(
        { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
        baseKey,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );
}

export async function encryptObjectForUrl(obj, password) {
    const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
    const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
    const key = await deriveKey(password, salt);

    const json = JSON.stringify(obj);
    const compressed = await gzipCompress(json);

    const encrypted = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        compressed
    );

    const output = new Uint8Array([...salt, ...iv, ...new Uint8Array(encrypted)]);
    return base64UrlEncode(output);
}

export async function decryptObjectFromUrl(encryptedStr, password) {
    const combined = base64UrlDecode(encryptedStr);

    const salt = combined.slice(0, SALT_LENGTH);
    const iv = combined.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
    const encryptedData = combined.slice(SALT_LENGTH + IV_LENGTH);

    const key = await deriveKey(password, salt);
    const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        encryptedData
    );

    const decompressed = await gzipDecompress(new Uint8Array(decrypted));
    return JSON.parse(decompressed);
}


export function sanitizeBase64(str) {
    // Remove non-base64 characters (only A–Z, a–z, 0–9, +, /)
    let cleaned = str.replace(/[^A-Za-z0-9+/=]/g, '');

    // Pad with '=' if length is not a multiple of 4
    while (cleaned.length % 4 !== 0) {
        cleaned += '=';
    }

    return cleaned;
}