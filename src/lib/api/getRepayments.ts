export async function getRepaymentsRecords() {
  const res = await fetch(
    "https://endyj33fq0.execute-api.ap-southeast-2.amazonaws.com/repayments",
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  console.log(res);

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();
  console.log(data);
  console.log(data.items);

  return data.items;
}
