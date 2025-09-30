"use client";

import { mapJapaneseKeysToEnglish } from "@/utils/mapJapaneseKeysToEnglish";
// @ts-ignore
import { Button } from "@/components/ui/shadcn/button";
import { useRepaymentSchedule } from "@/contexts/RepaymentContext";
import { reconcileScheduleWithCSV } from "@/utils/reconcileScheduleWithCSV";
import Encoding from "encoding-japanese";
import { Upload } from "lucide-react";
import Papa from "papaparse";
import { useRef, useState } from "react";

export default function CSVUploader() {
  const [csvData, setCsvData] = useState<any[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  const { schedules } = useRepaymentSchedule();

  const uploadCSVFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      // Shift-JIS → Unicode文字列に変換
      const unicodeString = Encoding.convert(uint8Array, {
        to: "UNICODE",
        from: "SJIS",
        type: "string",
      }) as string;

      Papa.parse(unicodeString, {
        header: true,
        skipEmptyLines: true,
        complete: async (results) => {
          const parsedData = results.data;
          const csvData = mapJapaneseKeysToEnglish(parsedData);
          const reconcileSchedule = reconcileScheduleWithCSV(
            csvData,
            schedules
          );

          const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
          try {
            const res = await fetch(`${endpoint}/transactions/uploads`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(reconcileSchedule),
            });
            if (res.ok) {
              alert("アップロード成功");
            } else {
              alert("アップロード失敗");
              const errorText = await res.text();
            }
          } catch (err) {
            // Handle upload error silently
          }
        },
      });
    } catch (error) {
      // Handle file read error silently
    }
  };

  return (
    <>
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={uploadCSVFile}
        style={{ display: "none" }}
      />

      <Button
        variant="outline"
        size="sm"
        className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
        onClick={handleButtonClick}
      >
        <Upload className="h-4 w-4 mr-2" />
        CSVアップロード
      </Button>
    </>
  );
}
