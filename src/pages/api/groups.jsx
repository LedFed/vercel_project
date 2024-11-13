import Cors from 'cors';
import initMiddleware from '../../app/lib/init-middleware'; // создадим этот файл позже
// import axios from 'axios';

// Инициализация CORS
const cors = initMiddleware(
    Cors({
        methods: ['GET', 'POST', 'OPTIONS'],
    })
);
// d29e43bd91c3ed2e3690490c11ecda88aa69e199 токен от strugov7
export default async function handler(req, res) {
    
    await cors(req, res); // Запускаем middleware CORS https://api.moysklad.ru/api/remap/1.2/entity/product

    if (req.method === 'GET') {
        console.log(req.query);
        const { value } = req.query;
        try {
            const response = await fetch(`https://api.moysklad.ru/api/remap/1.2/entity/product?${value}`, {
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
            const data = await response.json();
            res.status(200).json(data); // Возвращаем данные
            console.log(data);
        } catch (error) {
            console.error('ошибка:', error);
            res.status(500).json({ error: 'Ошибка' });
        } finally {
            console.log('Мы тут groups' );
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        console.log('errs');
    }
}