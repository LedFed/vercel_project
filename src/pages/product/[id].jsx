// 'use client';
// import axios from "axios";
'use client';
import Productpages from "../../app/components/Productpages";


// export async function getStaticPaths() {
//     try {
//         const response = await fetch(`https://localhost:3000/api/products`); // замените на ваш путь
//         const data = await response.json();
//         const paths = data.rows.map(product => ({
//             params: { id: product.code.toString() },
//         }));

//         return { paths, fallback: false };
//     } catch (error) {
//         console.error('Ошибка при получении данных:', error);
//         return { paths: [], fallback: false };
//     }
// }

// export async function getStaticProps({ params }) {
//     try {
//         const response = await fetch(`https://localhost:3000/api/groups?value=${encodeURIComponent(params.id)}`);// замените на ваш путь
//         if (!response.ok) {
//             throw new Error(`Ошибка сети: ${response.status} - ${response.statusText}`);
//         }
//         const data = await response.json();
//         const product = data.rows.find(i => i.code === params.id) || null; // Если продукт не найден, возвращаем null
//         return { props: { product } };
//     } catch (error) {
//         console.error('Ошибка при получении данных продукта:', error);
//         return { props: { product: null } };
//     }
//     // return { props: { product: response.data } };
// }

// pages/product/[id].jsx

export async function getStaticPaths() {
    try {
        const response = await fetch('https://api.moysklad.ru/api/remap/1.2/entity/product', {
            headers: {
                'Authorization': 'Bearer 04c229acda627c250062de4c2a82b1bc3c9293d5',
                'Accept-Encoding': 'gzip',
            },
            params: {
                expand: 'images, attributes',
                limit: 100,
                // fields: 'stock', 
            },
        });
        const data = await response.json();
        const paths = data.rows.map(product => ({
            params: { id: product.code.toString() },
        }));

        return { paths, fallback: 'blocking' }; // Используем fallback
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return { paths: [], fallback: false };
    }
}

export async function getStaticProps({ params }) {
    try {
        const response = await fetch(`https://api.moysklad.ru/api/remap/1.2/entity/product?${params.id}`, {
            headers: {
                'Authorization': 'Bearer 04c229acda627c250062de4c2a82b1bc3c9293d5',
                'Accept-Encoding': 'gzip',
            },
            params: {
                expand: 'images, attributes',
                limit: 100,
                // fields: 'stock', // Добавляем параметр fields
            },

        });

        if (!response.ok) {
            throw new Error(`Ошибка сети: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        const product = data.rows.find(i => i.code === params.id) || null; // Если продукт не найден, возвращаем null

        return { props: { product } };
    } catch (error) {
        console.error('Ошибка при получении данных продукта:', error);
        return { props: { product: null } }; // Возвращаем null, если продукт не найден
    }
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