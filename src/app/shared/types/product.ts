export interface Product {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: ProductPrice;
  issueDate: string;
}

export interface ProductPrice {
  current: number;
  currency: string;
}
