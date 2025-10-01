"use client";

import { mapJapaneseKeysToEnglish } from "@/utils/mapJapaneseKeysToEnglish";
import { JapaneseCsvRow } from "@/types/csv";
// @ts-ignore
import { Button } from "@/components/ui/shadcn/button";
import { useRepaymentSchedule } from "@/contexts/RepaymentContext";
import { reconcileScheduleWithCSV } from "@/utils/reconcileScheduleWithCSV";
import { handleApiError, handleFileError, getDisplayMessage, logError } from "@/lib/errorHandler";
import Encoding from "encoding-japanese";
import { Upload } from "lucide-react";
import Papa from "papaparse";
import { useRef, useState } from "react";

export default function CSVUploader() {
  const [csvData, setCsvData] = useState<JapaneseCsvRow[]>([]);

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
          const parsedData = results.data as JapaneseCsvRow[];
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
            const error = handleApiError(err, 'CSV アップロード');
            logError(error);
            alert(getDisplayMessage(error));
          }
        },
      });
    } catch (error) {
      const appError = handleFileError(error, file?.name);
      logError(appError);
      alert(getDisplayMessage(appError));
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
