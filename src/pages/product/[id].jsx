// 'use client';
// import axios from "axios";
'use client';
import Productpages from "../../app/components/Productpages";

export async function getStaticPaths() {
    try {
        const response = await fetch('http://localhost:3000/api/products'); // замените на ваш путь
        const data = await response.json();
        // console.log(data);
        const paths = data.rows.map(product => ({
            params: { id: product.code.toString() },
        }));

        // console.log(paths + 'получили путь');

        return { paths, fallback: false };
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return { paths: [], fallback: false };
    }
}

export async function getStaticProps({ params }) {
    try {
        const response = await fetch(`http://localhost:3000/api/groups?value=${encodeURIComponent(params.id)}`);// замените на ваш путь
        if (!response.ok) {
            throw new Error(`Ошибка сети: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        // console.log(data);

        const product = data.rows.find(i => i.code === params.id) || null; // Если продукт не найден, возвращаем null

        return { props: { product } };
    } catch (error) {
        console.error('Ошибка при получении данных продукта:', error);
        return { props: { product: null } };
    }
    // return { props: { product: response.data } };
}

const ProductPage = ({ product }) => {
    console.log(product);

    if (!product) {
        return <div>Продукт не найден</div>; // Обработка случая, когда продукт не найден
    }

    return (
        <>
            <div className="container">
                <div>Working...</div>
                <Productpages
                    product={product}
                />
            </div>
        </>
    );
};

export default ProductPage;