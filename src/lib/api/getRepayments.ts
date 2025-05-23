export async function getRepaymentsRecords() {
  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

  const res = await fetch(`${endpoint}/saveRepaymentRecord`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  console.log(res);

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();
  console.log(data);
  console.log(data.items);

  return data.items;
}
