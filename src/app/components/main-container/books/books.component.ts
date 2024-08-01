import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IBook } from '../../../interfaces/IBook.interface';
import { BooksService } from '../../../services/books.service';
import { GenresService } from '../../../services/genres.service';
import { AuthorsService } from '../../../services/authors.service';
import { IGenre } from '../../../interfaces/IGenre.interface';
import { IAuthor } from '../../../interfaces/IAuthor.interface';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  @Input() valueTemplateListBox = new EventEmitter<boolean>();
  @Output() listBoxType!: string;
  @Output() sendBookInfo!: IBook;

  books: IBook[] = [];
  filteredBooks: IBook[] = [];
  searchTerm: string = '';

  orderingIconPrice: number = 1;
  orderingIconDate: number = 1;
  menuFilterAuthor: boolean = false;
  menuFilterGenre: boolean = false;
  authorFilteredActive = false;
  authorFiltered!: String;
  genreFilteredActive = false;
  genreFiltered!: String;
  templateListBox: boolean = false;
  templateViewBook: boolean = false;
  genres!: IGenre[];
  authors!: IAuthor[];
  selectedBook!: IBook;

  constructor(private booksService: BooksService,
              private genresService: GenresService,
              private authorsService: AuthorsService) {}


  ngOnInit(): void {
    this.loadBooks();
    this.loadGenres();
    this.loadAuthors();
  }

  loadBooks(): void {
    this.booksService.getAllBooks().subscribe((data: IBook[]) => {
      this.books = data;
      this.filteredBooks = this.books; // Inicialmente, mostrar todos os livros
      this.orderBooksByTitle(); // Ordenar por título inicialmente
    });
  }

  loadGenres() {
    this.genresService.getAllGenres().subscribe(
      (data: IGenre[]) => {
        this.genres = data;
      },
      error => {
        console.error('Error fetching genres', error);
      }
    );
  }

  loadAuthors() {
    this.authorsService.getAllAuthors().subscribe(
      (data: IAuthor[]) => {
        this.authors = data;
      },
      error => {
        console.error('Error fetching authors', error);
      }
    );
  }

  openListBox(value: string) {
    this.templateListBox = true;
    this.listBoxType = value;
  }

  openViewBox(book: IBook) {
    this.templateViewBook = true;
    this.sendBookInfo = book;
  }

  openAddBook() {
    this.templateViewBook = true;

    let booksUndefined: IBook = {
      id: 0,
      title: ' ',
      author: ' ',
      publicationDate: new Date(),
      description: ' ',
      genres: [],
      numberOfPages: 0,
      value: 0
    }

    this.openViewBox(booksUndefined);
      
  }

  handleValueTemplateListBox(event: boolean) {
    this.templateListBox = event;
   }

   handleValueTemplateBookView(event: boolean) {
    this.templateViewBook = event;
    if (!event) {
      this.loadBooks(); 
    }
   }

  filterBooksByAuthor(authorName: string) {
    this.filteredBooks = this.books.filter(book => book.author === authorName);
    this.authorFiltered = authorName;
    this.authorFilteredActive = true;
    this.genreFilteredActive = false;
  }
  
  filterBooksByGenre(genreName: string) {
    this.filteredBooks = this.books.filter(book => 
      book.genres.some(genre => genre === genreName)
    );
    this.genreFiltered = genreName;
    this.genreFilteredActive = true;
    this.authorFilteredActive = false;
  }

  closeFilteredActive() {
    this.authorFilteredActive = false;
    this.genreFilteredActive = false;
    this.loadBooks();
  }

  formatDateShort(date: Date): string {
    const monthNames = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    const month = monthNames[new Date(date).getMonth()];
    const year = new Date(date).getFullYear();
    return `${month} / ${year}`;
  }

  searchBooks() {
    if (!this.searchTerm.trim()) {
      this.filteredBooks = this.books; // Mostrar todos os livros se o campo de pesquisa estiver vazio
      return;
    }

    const lowerCaseSearch = this.searchTerm.toLowerCase().trim();
    this.filteredBooks = this.books.filter(book =>
      book.title.toLowerCase().includes(lowerCaseSearch) ||
      book.author.toLowerCase().includes(lowerCaseSearch) ||
      book.genres.some(genre => genre.toLowerCase().includes(lowerCaseSearch))
    );
  }

  orderingValue() {
    this.orderingIconPrice++;
    if (this.orderingIconPrice == 4) {
      this.orderingIconPrice = 1;
    }
    if (this.orderingIconPrice === 1) {
      this.orderBooksByTitle();
    } else if (this.orderingIconPrice === 2) {
      this.filteredBooks.sort((a, b) => a.value - b.value);
      this.orderingIconDate = 1;
    } else if (this.orderingIconPrice === 3) {
      this.filteredBooks.sort((a, b) => b.value - a.value);
      this.orderingIconDate = 1;
    }
  }

  orderingDate() {
    this.orderingIconDate++;
    if (this.orderingIconDate == 4) {
      this.orderingIconDate = 1;
    }
    if (this.orderingIconDate === 1) {
      this.orderBooksByTitle();
    } else if (this.orderingIconDate === 2) {
      this.filteredBooks.sort((a, b) => new Date(a.publicationDate).getTime() - new Date(b.publicationDate).getTime());
      this.orderingIconPrice = 1;
    } else if (this.orderingIconDate === 3) {
      this.filteredBooks.sort((a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime());
      this.orderingIconPrice = 1;
    }
  }

  private orderBooksByTitle() {
    this.books.sort((a, b) => a.title.localeCompare(b.title));
  }

  openMenuFilter(value: string) {
    if (value == 'author') {
      this.menuFilterAuthor = !this.menuFilterAuthor;
    } else {
      this.menuFilterGenre = !this.menuFilterGenre;
    }
  }

  closeMenuValue(value: string) {
    if (value == 'author') {
      this.menuFilterAuthor = false;
    } else {
      this.menuFilterGenre = false;
    }
  }

}
