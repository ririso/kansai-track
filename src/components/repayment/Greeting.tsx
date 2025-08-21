export default function Greeting() {
  const userName = "testユーザー";
  const message = "開発&返済がんばりましょう！";

  return (
    <div className="mb-8 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {userName ? `おかえりなさい、${userName}さん！` : "おかえりなさい！"}
      </h2>
      <p className="text-gray-600">{message}</p>
    </div>
  );
}
