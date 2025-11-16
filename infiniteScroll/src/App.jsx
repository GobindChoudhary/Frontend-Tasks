import React, { useEffect, useState } from "react";
import "./App.css";
const App = () => {
  const [data, setData] = useState([...new Array(20)]);
  const [loading, setLoading] = useState(false);
  const THRESHOLD = 5;

  const fetchdata = () => {
    setLoading(true);
    setTimeout(() => {
      setData((prev) => [...prev, ...new Array(20)]);
      setLoading(false);
    }, 2000);
  };

  const handleScroll = (e) => {
    const clientHeight = e.target.clientHeight;
    const scrollTop = e.target.scrollTop;
    const scrollHeight = e.target.scrollHeight;
    const remaingScroll = scrollHeight - (clientHeight + scrollTop);
    if (remaingScroll < THRESHOLD) {
      fetchdata();
    }
  };

  useEffect(() => {});
  return (
    <div className="container">
      <h1>Infinity Scroll</h1>
      <div onScroll={handleScroll} className="box-container">
        {data.map((item, i) => {
          return (
            <div key={i} className="numbers">
              {i}
            </div>
          );
        })}
        {loading ? <div>Loading... </div> : ""}
      </div>
    </div>
  );
};

export default App;
