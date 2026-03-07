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

 static toPersistence(data: any) {
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

  static toPersistenceItems(orderId: string, items: any[]) {
    return items.map((item: any) => ({
      orderId: orderId,
      productId: parseInt(item.idItem),
      quantity: item.quantidadeItem,
      price: item.valorItem
    }));
  }

 
  static toUpdatePersistence(data: any) {
  const value = data.valorTotal;
  const date = data.dataCriacao ? new Date(data.dataCriacao) : new Date();
  return {
    value: value,
    creationDate: date
  };
}
}