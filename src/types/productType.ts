export interface TProduct {
  id: string;
  shopId: string,
  categoryId: string,
  category: Record<string, any>;
  name: string,
  description:string;
  code: string,
  images: string[],
  price: number,
  discount: number,
  stock: number,
  Reviews: object[],
}

export interface TProductInput extends TProduct {
  picture: any;
}

export interface TProductManage {
  id: string;
  name: string;
  code: string;
  price: number;
  qty: number;
}
