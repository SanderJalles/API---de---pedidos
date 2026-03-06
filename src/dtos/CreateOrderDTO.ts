export interface CreateOrderDTO {
  numeroPedido: string;   
  valorTotal: number;     
  dataCriacao: string;    
  items: {                
    idItem: string;       
    quantidadeltem: number; 
    valorltem: number;    
  }[];
}