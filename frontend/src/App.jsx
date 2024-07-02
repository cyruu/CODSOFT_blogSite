import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [data, setData] = useState();
  async function getData() {
    const res = await axios.get("http://localhost:3000/getdata");
    setData(res.data.title);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <h1>hello {data}</h1>
    </>
  );
}

export default App;
