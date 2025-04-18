import { useEffect, useState } from "react";
import { getProducts } from "./services/api";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((res) => setProducts(res.data));
  }, []);

  return (
    <div>
      <h1>Product list</h1>
      {products.map((p) => (
        <div key={p.id}>
          <h2>{p.name}</h2>
          <p>{p.description}</p>
          <span>${p.price}</span>
        </div>
      ))}
    </div>
  );
}

export default App;
