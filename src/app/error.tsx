"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Error logging removed for production
  }, [error]);

  return (
    <div>
      <h2>エラーが発生しました。</h2>
      <button onClick={() => reset()}>再試行</button>
    </div>
  );
}
