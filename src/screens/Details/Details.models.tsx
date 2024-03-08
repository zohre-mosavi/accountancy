import {IProduct} from '../Home/Home.models';

export interface IState {
  products: IProduct[];
  product: IProduct;
}

export interface IProps {
  id: number;
  visible: boolean;
  onClose: () => void;
  onIncrement: (body?: any) => void;
  onDecrement: (boDy?: any) => void;
}
