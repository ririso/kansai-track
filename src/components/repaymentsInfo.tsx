import { getRepaymentsRecords } from "@/lib/api/getRepayments";
import { RepaymentInfo } from "@/types/repaymentInfo";
import { useEffect, useState } from "react";

export default function RepaymentsInfo() {
  const [records, setRecords] = useState<RepaymentInfo[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getRepaymentsRecords()
      .then(setRecords)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>エラー: {error}</p>;

  return (
    <div>
      <h1>返済集計</h1>
      {records && records.length > 0 ? (
        <ul>
          {records.map((transaction) => (
            <li key={transaction.id}>
              <p>ID:{transaction.id}</p>
              <p>
                <strong>日付:</strong> {transaction.date}
              </p>
              <p>
                <strong>取引内容:</strong> {transaction.description}
              </p>
              <p>
                <strong>出金金額(円):</strong> {transaction.debit}
              </p>
              <p>
                <strong>入金金額(円):</strong> {transaction.credit}
              </p>
              <p>
                <strong>メモ:</strong> {transaction.note}
              </p>
              <hr />
            </li>
          ))}
        </ul>
      ) : (
        <p>データがありません。</p>
      )}
    </div>
  );
}
