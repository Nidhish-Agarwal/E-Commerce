import React, { useEffect, useState } from "react";
import Card from "../components/ProductCard/Card";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function HomePage() {
  const dataRedux = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await axios.get(
      "http://localhost:8080/product/get-products"
    );
    setProducts(response.data.data);
  };

  useEffect(() => {
    const callProducts = async () => {
      await getProducts();
    };
    callProducts();
  }, []);

  const handleDelete = async (id) => {
    console.log("id", id);
    const data = await axios.delete(`http://localhost:8080/product/${id}`);
    await getProducts();
  };

  return (
    <>
      <div className="grid gap-4 grid-cols-4">
        {products.map((element, index) => (
          <Card product={element} handleDelete={handleDelete} key={index} />
        ))}
      </div>
    </>
  );
}

export default HomePage;
