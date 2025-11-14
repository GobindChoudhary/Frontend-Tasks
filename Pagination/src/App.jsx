import React, { useEffect, useState } from "react";
import "./App.css";
const App = () => {
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const pageLimit = 12;
  const totalPage = Math.ceil(products.length / pageLimit);
  const start = pageNumber * pageLimit;
  const end = start + pageLimit;

  const getProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=200");
    const data = await res.json();
    setProducts(data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container">
      <h1 className="heading">Pagination</h1>
      <div className="pages">
        <button
          disabled={pageNumber === 0}
          className="page-numbers"
          onClick={() => setPageNumber((prev) => prev - 1)}
        >
          ◀️
        </button>
        {[...Array(totalPage).keys()].map((n, i) => (
          <button
            className={`page-numbers ${pageNumber == n ? "active" : ""}`}
            key={i}
            onClick={() => setPageNumber(n)}
          >
            {n}
          </button>
        ))}
        <button
          disabled={pageNumber === totalPage - 1}
          className="page-numbers"
          onClick={() => setPageNumber((prev) => prev + 1)}
        >
          ▶️
        </button>
      </div>
      <div className="product-card">
        {products.slice(start, end).map((product, i) => {
          return (
            <div key={i} className="product-container">
              <img src={product.thumbnail} alt="" />
              <p className="title">{product.title}</p>
            </div>
          );
        })}
      </div>
      <div className="pages">
        <button
          disabled={pageNumber === 0}
          className="page-numbers"
          onClick={() => setPageNumber((prev) => prev - 1)}
        >
          ◀️
        </button>
        {[...Array(totalPage).keys()].map((n, i) => (
          <button
            className={`page-numbers ${pageNumber == n ? "active" : ""}`}
            key={i}
            onClick={() => setPageNumber(n)}
          >
            {n}
          </button>
        ))}
        <button
          disabled={pageNumber === totalPage - 1}
          className="page-numbers"
          onClick={() => setPageNumber((prev) => prev + 1)}
        >
          ▶️
        </button>
      </div>
    </div>
  );
};

export default App;
