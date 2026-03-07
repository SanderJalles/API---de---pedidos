import { PrismaClient } from '@prisma/client';
import type { CreateOrderDTO } from '../dtos/CreateOrderDTO.js';
import { OrderMapper } from '../mappers/OrderMapper.js';

const prisma = new PrismaClient();

export class OrderService {
  async createOrder(data: CreateOrderDTO) {

    const mappedOrder = {
      orderId: data.numeroPedido,           
      value: data.valorTotal,               
      creationDate: new Date(data.dataCriacao), 
      items: {
        create: data.items.map(item => ({
          productId: parseInt(item.idItem),  
          quantity: item.quantidadeltem,     
          price: item.valorltem             
        }))
      }
    };

    return await prisma.order.create({
      data: mappedOrder,
      include: { items: true } 
    });
  }

  async getOrderById(orderId: string) {
    return await prisma.order.findUnique({
      where: { orderId },
      include: { items: true }
    });
  }
}