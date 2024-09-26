import { useState } from "react";

export default function Page1() {
  const [count, setCount] = useState(0);

  return <div>
    Page 1 KeepAlive 页面
    <div>
      <button onClick={() => {
        setCount(count + 1);
      }}>count</button>
    </div>
    {count}
  </div>;
}
