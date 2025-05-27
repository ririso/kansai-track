"use client";

import { mapJapaneseKeysToEnglish } from "@/utils/mapJapaneseKeysToEnglish";
import Papa from "papaparse";
import { useState } from "react";

export default function CSVUploader() {
  const [csvData, setCsvData] = useState<any[]>([]);

  const uploadCSVFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const text = reader.result as string;
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: async (results) => {
          const parsedData = results.data;

          // TODO キーバリューが日本語なので修正する。
          // キーをJsonに置き換える
          const csvData = mapJapaneseKeysToEnglish(parsedData);

          setCsvData(csvData);

          console.log(csvData);

          const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

          try {
            const res = await fetch(`${endpoint}/transactions/uploads`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(csvData),
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
    };
    reader.readAsText(file, "utf-8"); // Shift_JISなのでUTF-8 に変換
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">CSVデータをアップロードする</h2>
      <input
        type="file"
        accept=".csv"
        onChange={uploadCSVFile}
        className="mb-4"
      />
      <pre className="text-sm bg-gray-100 p-2">
        {JSON.stringify(csvData, null, 2)}
      </pre>
    </div>
  );
}
