import { fetchRepaymentRecords } from "@/lib/api/getRepayment";
import { RepaymentTotals } from "@/types/total-balance";
import { useEffect, useState } from "react";

export default function TotalRepayment() {
  const [records, setRecords] = useState<RepaymentTotals | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchRepaymentRecords()
      .then(setRecords)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>エラー: {error}</p>;

  return (
    <div>
      <h1>返済集計</h1>
      {records ? (
        <ul>
          <li>合計残高（Balance）: {records.totalBalance}</li>
          <li>合計クレジット（Credit）: {records.totalCredit}</li>
          <li>合計デビット（Debit）: {records.totalDebit}</li>
        </ul>
      ) : (
        <p>データがありません。</p>
      )}
    </div>
  );
}
