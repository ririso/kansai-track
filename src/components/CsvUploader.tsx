"use client";

import { mapJapaneseKeysToEnglish } from "@/utils/mapJapaneseKeysToEnglish";
// @ts-ignore
import { useRepaymentSchedule } from "@/contexts/RepaymentContext";
import { reconcileScheduleWithCSV } from "@/utils/reconcileScheduleWithCSV";
import Encoding from "encoding-japanese";
import { Upload } from "lucide-react";
import Papa from "papaparse";
import { useRef, useState } from "react";
import { Button } from "./ui/shadcn/button";

export default function CSVUploader() {
  const [csvData, setCsvData] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  const { schedules, isLoading, error, totalCreditAmount, totalScheduleCount } =
    useRepaymentSchedule();

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
      });

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

          // setCsvData(csvData);
          console.log(reconcileSchedule);
          //ここからすり合わせが必要になる。
          // TODO:取得したデータとすり合わせをしてみる。
          // まずは実績テーブルとすり合わせを行う。(あとでいいや！)
          // 一致しないものだけ残す？(これ面倒かな？)
          // 一致した、かつ予定だった場合は完了に変更
          // さらに
          // ここで予定かつ現在の日時を過ぎているものを未払いにする。
          // 予定にないが、支払いがあったものはどう対応するか？

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
              console.error("Upload failed with status:", res.status);
              console.error("Response body:", errorText);
            }
          } catch (err) {
            console.error("Fetch failed:", err);
          }
        },
      });
    } catch (error) {
      console.error("Failed to read file:", error);
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
