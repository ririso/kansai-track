export async function getRepaymentSchedule() {
  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

  const res = await fetch(`${endpoint}/repayments/schedule`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();

  return data.items;
}
