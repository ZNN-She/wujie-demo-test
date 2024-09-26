import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import KeepAlive, { AliveScope } from "react-activation";
import WujieReact from "wujie-react";
import Page1 from "./page/page1";

const { bus } = WujieReact;

function App() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('window.location.pathname', window.parent.location.pathname, location.pathname)
    if(window.parent.location.pathname !== location.pathname){
      navigate(window.parent.location.pathname)
    }
  }, [])

  useEffect(() => {
    bus.$on("wujie.mainAppRouterChange", mainAppRouterChange);
    return () => {
      bus.$off("wujie.mainAppRouterChange", mainAppRouterChange);
    };
  }, [])

  function mainAppRouterChange(data) {
    console.log("主应用过到来的出数据：", data);
    navigate(data.path);
  }

  function handleClick(path) {
    navigate(path);
    bus.$emit("wujie.subAppRouterChange", { name: 'subject_01', path });
  }


  return (
    <AliveScope>
      <div>我是 subject_01 页面, 保活的页面</div>
      <div>主应用过到来的出数据：{JSON.stringify(window?.$wujie?.props)}</div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        <button onClick={() => handleClick("/subject_01/page1")}>page1</button>
        <button onClick={() => handleClick("/subject_01/page2")}>page2</button>
      </div>
      <div>
        <Routes>
          <Route
            path="/subject_01/page1"
            element={
              <KeepAlive>
                <Page1></Page1>
              </KeepAlive>
            }
          />
          <Route
            path="/subject_01/page2"
            element={<div>我是 subject_01 page 2</div>}
          />
        </Routes>
      </div>
    </AliveScope>
  );
}

export default App;
