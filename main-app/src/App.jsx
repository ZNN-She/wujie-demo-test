import { useState, useEffect } from "react";
import WujieReact from "wujie-react";
import { Button, Space } from "antd";
import { Routes, Route, useNavigate } from "react-router-dom";

const { bus } = WujieReact;

function App() {
  const navigate = useNavigate();

  const [subjectAlive, setSubjectAlive] = useState(false);
  const [projectData01, setProjectData01] = useState({
    name: 'subject_01',
    path: '/subject_01/page1'
  });

  useEffect(() => {
    bus.$on("wujie.subAppRouterChange", navigateFn);

    return () => {
      bus.$off("wujie.subAppRouterChange", navigateFn);
    };
  }, [])

  function navigateFn(data) {
    console.log("主应用接收子应用消息", data);
    navigate(data.path);
  };

  return (
    <div style={{ overflow: "auto" }}>
      <div>主应用</div>
      <div>
        <Space>
          <Button
            onClick={() => {
              navigate("/subject_01");
              bus.$emit("wujie.mainAppRouterChange", {
                path: "/subject_01",
                name: "subject_01",
              });
              setProjectData01({
                name: "subject_01",
                path: "/subject_01",
              });
            }}
          >
            子应用_01
          </Button>
          <Button
            onClick={() => {
              navigate("/subject_01/page1");
              bus.$emit("wujie.mainAppRouterChange", {
                path: "/subject_01/page1",
                name: "subject_01",
              });
              setProjectData01({
                name: "subject_01",
                path: "/subject_01/page1",
              });
            }}
          >
            子应用_01_page1
          </Button>
          <Button
            onClick={() => {
              navigate("/subject_02");
              bus.$emit("wujie.mainAppRouterChange", {
                path: "/subject_02",
                name: "subject_02",
              });
            }}
          >
            子应用_02
          </Button>
          {/* <Button>子应用_03</Button> */}
        </Space>
      </div>
      <div>
        <Routes>
          <Route
            path="/subject_01/*"
            element={
              <WujieReact
                props={{
                  testMsg: "我是主应用传递过来的参数",
                }}
                width={"100%"}
                height={"100%"}
                name={"subject_01"}
                alive={subjectAlive}
                url={`//localhost:5714/`}
                beforeLoad={() => {
                  console.log("主应用beforeMount");
                  setSubjectAlive(true);
                }}
              ></WujieReact>
            }
          ></Route>
          <Route
            path="/subject_02/*"
            element={
              <WujieReact
                props={{
                  testMsg: "我是主应用传递过来的参数",
                }}
                width={"100%"}
                height={"100%"}
                name={"subject_02"}
                url={"//localhost:5715/"}
              ></WujieReact>
            }
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
