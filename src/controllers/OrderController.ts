import { Request, Response } from 'express';
import { OrderService } from '../services/OrderService.js';

const orderService = new OrderService();

export class OrderController {
  async create(req: Request, res: Response) {
    try {
      const order = await orderService.createOrder(req.body);
      return res.status(201).json(order); 
    } catch (error: any) { 
      return res.status(400).json({ error: error.message || "Erro ao processar pedido" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params; 
      const order = await orderService.getOrderById(id as string);

      if (!order) {
        return res.status(404).json({ message: "Pedido não encontrado" });
      }

      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
}