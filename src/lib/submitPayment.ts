export type PaymentPayload = {
  date: string;
  transactionName: string;
  credit: number;
  note?: string;
};

export const submitPayment = async (payload: PaymentPayload): Promise<void> => {
  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

  const response = await fetch(`${endpoint}/saveRepaymentRecord`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("保存に失敗しました");
  }
};
