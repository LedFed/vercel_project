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
                fields: 'stock', 
            },
        });
        const data = await response.json();
        const paths = data.rows.map(product => ({
            params: {
                id: product.code.toString(),
            },
        }));

        return { paths, fallback: 'blocking' }; // Используем fallback
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return { paths: [], fallback: false };
    }
}

export async function getStaticProps({ params }) {
    try {
        // Получаем данные о продукте
        const response = await fetch(`https://api.moysklad.ru/api/remap/1.2/entity/product`, {
            headers: {
                'Authorization': 'Bearer 04c229acda627c250062de4c2a82b1bc3c9293d5',
                'Accept-Encoding': 'gzip',
            },
            params: {
                expand: 'images, attributes',
                limit: 100,
                fields: 'stock', 
            },
        });
        // console.log(params.cd);
        // if (!productResponse.ok) {
        //     throw new Error(`Ошибка при получении данных о продукте: ${productResponse.statusText}`);
        // }

        const data = await response.json();
        const product = data.rows.find(i => i.code === params.id) || null; 
        // const product = data.rows.find(i => i.code === params.id) || null;
        const imagess = await product.images.meta.href;
        const responseImage = await fetch(imagess, {
            headers: {
                'Authorization': 'Bearer 04c229acda627c250062de4c2a82b1bc3c9293d5',
                'Accept-Encoding': 'gzip',
            },
            params: {
                expand: 'images, attributes',
                limit: 100,
                fields: 'stock', 
            },
        })
        const imagesData = await responseImage.json();
        // Получаем изображения продукта
        // const imagesResponse = await fetch(`https://api.moysklad.ru/api/remap/1.2/entity/product/${params.cd}/images`, {
        //     headers: {
        //         'Authorization': 'Bearer 04c229acda627c250062de4c2a82b1bc3c9293d5',
        //         'Accept-Encoding': 'gzip',
        //     },
        //     params: {
        //         expand: 'images, attributes',
        //         limit: 100,
        //         fields: 'stock',
        //     },
        // });

        // if (!imagesResponse.ok) {
        //     throw new Error(`Ошибка при получении изображений: ${imagesResponse.statusText}`);
        // }

        // const imagesData = await imagesResponse.json();

        // return {
        //     props: {
        //         product: product,
        //         // images: imagesData.rows, // Предполагаем, что изображения находятся в массиве rows
        //     },
        //     // Опционально, если вы хотите обновлять данные каждые 60 секунд
        //     fallback: 'blocking' }
        // ;
        // return { props: {product, responseImage} };
        return { props: { product, images: imagesData } }
    } catch (error) {
        console.error('Ошибка при получении данных продукта:', error);
        return { props: { product: null } }; // Возвращаем null, если продукт не найден
    }
}


const ProductPage = ({ product, images }) => {
    console.log(product);
    console.log(images);

    if (!product) {
        return <div>Продукт не найден</div>; // Обработка случая, когда продукт не найден
    }

    return (
        <>
            <div className="container">
                {/* <div>Working...</div> */}
                <Productpages
                    product={product}
                    images={images}
                />
            </div>
        </>
    );
};

export default ProductPage;