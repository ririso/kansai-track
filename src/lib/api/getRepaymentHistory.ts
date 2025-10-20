export async function fetchRepaymentHistory() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/getRepaymentHistory`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();
  return data.repaymentHistories;
}
