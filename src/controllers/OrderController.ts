import { Request, Response } from 'express';
import { OrderService } from '../services/OrderService.js';
import { CreateOrderDTO } from '../dtos/CreateOrderDTO.js';

const orderService = new OrderService();

export class OrderController {
  async create(req: Request, res: Response) {
    try {
      const data: CreateOrderDTO = req.body;
      const order = await orderService.createOrder(data);
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

  async listAll(req: Request, res: Response) {
  try {
    const orders = await orderService.getAllOrders();
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao listar pedidos" });
  }
}

async update(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updated = await orderService.updateOrder(id as string, req.body);
    
    return res.status(200).json(updated);
  } catch (error: any) {
    return res.status(400).json({ 
      error: "Erro ao atualizar pedido", 
      details: error.message 
    });
  }
}

async remove(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await orderService.deleteOrder(id as string);
    return res.status(204).send(); 
  } catch (error) {
    return res.status(400).json({ error: "Erro ao deletar pedido" });
  }
}
}