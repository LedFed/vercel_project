'use client';
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [cart, setCart] = useState([]);
  const [totalQuant, settotalQuant] = useState(0);
  const [totalSum, settotalSum] = useState(0);
  const [products, setProducts] = useState(0);

  async function getProducts() { //Возвращает продукт
    try {
      // const response = await fetch('/api/products');// замените на ваш путь
      const response = await fetch(`/api/products`);
      const data = await response.json();
      console.log(data);
      setProducts(data.rows)
      // return data.rows;
      console.log(products);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

    getProducts();
  }, []);
  if (!products) {
    return <div>Загрузка</div>;
  }

  return (
    <div>
      {products.map(e => (
        <Link href={`/product/${e.code}`} prefetch={true}>

          <div key={e.id}>{e.name}</div> // Исправлено
        </Link>
      ))}

    </div>
  )
}
