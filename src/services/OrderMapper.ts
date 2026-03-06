interface OrderRequest {
  numeroPedido: string;
  valorTotal: number;
  dataCriacao: string;
  items: {
    idItem: string;
    quantidadeltem: number;
    valorltem: number;
  }[];
}

export class OrderMapper {
  static toPersistence(data: OrderRequest) {
    return {
      orderId: data.numeroPedido,           // Transformação [cite: 267]
      value: data.valorTotal,               // Transformação [cite: 268]
      creationDate: new Date(data.dataCriacao), // Transformação [cite: 269]
      items: data.items.map(item => ({
        productId: parseInt(item.idItem),   // Transformação [cite: 274]
        quantity: item.quantidadeltem,      // Transformação [cite: 275]
        price: item.valorltem               // Transformação [cite: 276]
      }))
    };
  }
}