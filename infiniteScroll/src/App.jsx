import React, { useEffect, useRef, useState } from "react";
import "./App.css";
const App = () => {
  const [data, setData] = useState([...new Array(20)]);
  const [loading, setLoading] = useState(false);

  const refList = useRef([]);

  const fetchdata = () => {
    setLoading(true);
    setTimeout(() => {
      setData((prev) => [...prev, ...new Array(20)]);
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        observer.unobserve(entries[0].target);
        fetchdata();
      }
    });

    const lastElement = refList.current[refList.current.length - 1];
    observer.observe(lastElement);

    return () => {
      // observer.unobserve(lastElement);
      observer.disconnect();
    };
  }, [data.length]);

  return (
    <div className="container">
      <h1>Infinity Scroll</h1>
      <div className="box-container">
        {data.map((item, i) => {
          return (
            <div
              ref={(el) => (refList.current[i] = el)}
              key={i}
              className="numbers"
            >
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
