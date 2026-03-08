import express, { json } from 'express';
import cors from 'cors';
import orderRoutes from './routes/orderRoutes.js';

const app = express();
const PORT = 3000;

// Middlewares padrão
app.use(cors());
app.use( express.json()); 

// Rotas da API conforme o desafio 
app.use(orderRoutes);

// Middleware de Erro Global (Diferencial de robustez) 
app.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo deu errado no servidor!' });
});

app.listen(PORT, () => {
    console.log(`🚀 API Jitterbit rodando em http://localhost:${PORT}`);
});