import { IBook } from "./IBook.interface";

export interface ISaleHistory {
    id: number;
    saleDate: Date;
    books: IBook[];
    totalValue: number;
}
