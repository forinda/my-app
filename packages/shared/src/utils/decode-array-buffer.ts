export function decodeArrayBuffer<T>(data: ArrayBuffer): T {
  const uint8Array = new Uint8Array(data);
  const decoder = new TextDecoder();
  const jsonString = decoder.decode(uint8Array);
  return JSON.parse(jsonString);
}
