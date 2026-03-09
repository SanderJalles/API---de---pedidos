import express, { json } from 'express';
import cors from 'cors';
import orderRoutes from './routes/orderRoutes.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use( express.json()); 

app.use(orderRoutes);

app.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo deu errado no servidor!' });
});

app.listen(PORT, () => {
    console.log(`API Jitterbit rodando em http://localhost:${PORT}`);
});