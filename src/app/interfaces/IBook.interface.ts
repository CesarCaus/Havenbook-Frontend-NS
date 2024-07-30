export interface IBook {
    id: number;
    title: string;
    author: string;
    publicationDate: Date;
    description: string;
    genres: string[];
    numberOfPages: number;
    value: number;
}
