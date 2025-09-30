declare module 'encoding-japanese' {
  interface ConvertOptions {
    to?: string;
    from?: string;
    type?: 'string' | 'array' | 'arraybuffer';
  }

  interface DetectResult {
    encoding: string;
    confidence?: number;
  }

  export function detect(data: Uint8Array | string): DetectResult;
  export function convert(data: Uint8Array | string | number[], options: ConvertOptions): string | Uint8Array | number[];
  export function urlEncode(data: Uint8Array): string;
  export function urlDecode(data: string): Uint8Array;
  export function base64Encode(data: Uint8Array): string;
  export function base64Decode(data: string): Uint8Array;

  const Encoding: {
    detect: typeof detect;
    convert: typeof convert;
    urlEncode: typeof urlEncode;
    urlDecode: typeof urlDecode;
    base64Encode: typeof base64Encode;
    base64Decode: typeof base64Decode;
  };

  export default Encoding;
}