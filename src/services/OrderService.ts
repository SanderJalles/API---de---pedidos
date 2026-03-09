import { PrismaClient } from '@prisma/client';
import type { CreateOrderDTO } from '../dtos/CreateOrderDTO.js';
import { OrderMapper } from '../mappers/OrderMapper.js';
import { UpdateOrderDTO } from '../dtos/UpdateOrderDTO.js';

const prisma = new PrismaClient();

export class OrderService {
  async createOrder(data: CreateOrderDTO) {

    const mappedOrder = OrderMapper.toPersistence(data);
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

  async getAllOrders() {
  return await prisma.order.findMany({
    include: { items: true },
    orderBy: { creationDate: 'desc' } 
  });
}

async updateOrder(orderId: string, data: UpdateOrderDTO) {
  return await prisma.$transaction(async (tx) => {
    
    const orderData = OrderMapper.toUpdatePersistence(data);
    await tx.order.update({
      where: { orderId },
      data: orderData
    }); 
     
    if (data.items && data.items.length > 0) {
      await tx.item.deleteMany({ where: { orderId } });
      
      const mappedItems = OrderMapper.toPersistenceItems(orderId, data.items);
      await tx.item.createMany({ data: mappedItems });
    }

    return tx.order.findUnique({
      where: { orderId },
      include: { items: true }
    });
  });
}

async deleteOrder(orderId: string) {
  await prisma.item.deleteMany({
    where: { orderId }
  });
  
  return await prisma.order.delete({
    where: { orderId }
  });
}
}