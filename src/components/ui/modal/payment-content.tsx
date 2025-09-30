"use client";

import { PaymentPayload, submitPayment } from "@/lib/submitPayment";
import { useState } from "react";

export const PaymentForm = () => {
  const [form, setForm] = useState<PaymentPayload>({
    date: "2025-11-21",
    transactionName: "description",
    credit: 15000,
    note: "test",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "note" || name === "description" || name === "date"
          ? value
          : Number(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitPayment(form);
      alert("保存成功");
    } catch (err) {
      alert("保存失敗");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <label className="block text-sm font-medium">支払日</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">取引内容</label>
        <input
          type="text"
          name="description"
          value={form.transactionName}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">入金金額</label>
        <input
          type="number"
          name="credit"
          value={form.credit}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">メモ</label>
        <textarea
          name="note"
          value={form.note}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        保存
      </button>
    </form>
  );
};
