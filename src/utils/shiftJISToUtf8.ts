import Encoding from "encoding-japanese";

export function convertShiftJISToUtf8(uint8Array: Uint8Array): string {
  return Encoding.convert(uint8Array, {
    to: "UNICODE",
    from: "SJIS",
    type: "string",
  }) as string;
}
