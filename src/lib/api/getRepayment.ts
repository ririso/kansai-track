export async function fetchRepaymentRecords() {
  const res = await fetch(
    "https://endyj33fq0.execute-api.ap-southeast-2.amazonaws.com/getRepaymentRecord",
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();
  console.log(data);
  return data.items || [];
}
