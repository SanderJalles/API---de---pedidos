import { CreateOrderDTO } from "../dtos/CreateOrderDTO.js";
import { UpdateOrderDTO } from "../dtos/UpdateOrderDTO.js";


export class OrderMapper {

 static toPersistence(data: CreateOrderDTO) {
    return {
      orderId: data.numeroPedido,
      value: data.valorTotal,
      creationDate: new Date(data.dataCriacao),
      items: {
        create: data.items.map((item: any) => ({
          productId: parseInt(item.idItem),
          quantity: item.quantidadeItem,
          price: item.valorItem
        }))
      }
    };
  }

  static toPersistenceItems(orderId: string, items: UpdateOrderDTO['items']) {
  if (!items) return [];
  return items.map(item => ({
    orderId,
    productId: parseInt(item.idItem),
    quantity: item.quantidadeItem,
    price: item.valorItem
  }));
}

 
  static toUpdatePersistence(data: UpdateOrderDTO) {
  return {
    ...(data.numeroPedido && { orderId: data.numeroPedido }),
    ...(data.valorTotal !== undefined && { value: data.valorTotal }),
    ...(data.dataCriacao && { creationDate: new Date(data.dataCriacao) }),
  };
}
}