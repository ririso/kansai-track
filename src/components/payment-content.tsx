"use client";

import { PaymentPayload, submitPayment } from "@/lib/submitPayment";
import { useState } from "react";

export const PaymentForm = () => {
  const [form, setForm] = useState<PaymentPayload>({
    date: "2025-11-21",
    description: "description",
    debit: 1,
    credit: 2,
    balance: 3,
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
      console.log(err);
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
        <label className="block text-sm font-medium">説明</label>
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">支払額（debit）</label>
        <input
          type="number"
          name="debit"
          value={form.debit}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">
          クレジット（credit）
        </label>
        <input
          type="number"
          name="credit"
          value={form.credit}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">残高（balance）</label>
        <input
          type="number"
          name="balance"
          value={form.balance}
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
