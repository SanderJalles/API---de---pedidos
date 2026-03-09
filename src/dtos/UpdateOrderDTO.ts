export interface UpdateOrderDTO {
  numeroPedido?: string;   
  valorTotal?: number;     
  dataCriacao?: string;    
  items?: {                
    idItem: string;
    quantidadeItem: number;
    valorItem: number;
  }[];
}