export interface IState {
  products: IProduct[];
  visibleDetails: boolean;
  tempId: number;
}

export interface IProduct {
  id: number;
  name: string;
  price: string;
  totalCount: number;
}
