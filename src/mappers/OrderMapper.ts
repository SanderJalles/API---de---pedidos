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
      orderId: data.numeroPedido,           
      value: data.valorTotal,               
      creationDate: new Date(data.dataCriacao), 
      items: data.items.map(item => ({
        productId: parseInt(item.idItem),   
        quantity: item.quantidadeltem,     
        price: item.valorltem               
      }))
    };
  }
}