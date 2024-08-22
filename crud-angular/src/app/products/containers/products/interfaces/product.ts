import { Tag } from "./tag";

export interface Product {
  _id: string;
  name: string;
  description: string;
  urlImage: string;
  unitValue: number;
  tags: Tag[];
}
