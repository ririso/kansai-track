export type PaymentPayload = {
  date: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
  note?: string;
};

export const submitPayment = async (payload: PaymentPayload): Promise<void> => {
  const response = await fetch(
    "https://endyj33fq0.execute-api.ap-southeast-2.amazonaws.com/saveRepaymentRecord",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error("保存に失敗しました");
  }
};
