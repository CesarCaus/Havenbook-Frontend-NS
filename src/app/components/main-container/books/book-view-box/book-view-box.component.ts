import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBook } from '../../../../interfaces/IBook.interface';
import { AuthorsService } from '../../../../services/authors.service';
import { GenresService } from '../../../../services/genres.service';
import { BooksService } from '../../../../services/books.service';
import { IAuthor } from '../../../../interfaces/IAuthor.interface';
import { IGenre } from '../../../../interfaces/IGenre.interface';

@Component({
  selector: 'app-book-view-box',
  templateUrl: './book-view-box.component.html',
  styleUrls: ['./book-view-box.component.scss']
})
export class BookViewBoxComponent implements OnInit {
  @Output() valueTemplateBookView = new EventEmitter<boolean>();
  @Output() bookUpdated = new EventEmitter<void>();
  @Input() bookInfo!: IBook;

  templateNewBook: boolean = true;
  book!: IBook;
  genres: IGenre[] = [];
  authors: IAuthor[] = [];

  newBook: IBook = {
    id: 0,
    title: '',
    author: '',
    publicationDate: new Date(),
    description: '',
    genres: [],
    numberOfPages: 0,
    value: 0
  };

  constructor(
    private genresService: GenresService, 
    private authorsService: AuthorsService,
    private booksService: BooksService
  ) {}

  ngOnInit(): void {
    if (this.bookInfo) {
      this.book = this.bookInfo;

      if (this.bookInfo.id > 0) {
        this.templateNewBook = false;
        this.newBook = { ...this.bookInfo };
      } else {
        this.templateNewBook = true;
      }

      this.loadGenres();
      this.loadAuthors();
    } else {
      console.error('bookInfo is null or undefined');
    }
  }

  editBook(): void {
    this.templateNewBook = true;
  }

  saveBook(): void {
    if (this.newBook.id > 0) {
      this.booksService.updateBook(this.newBook.id, this.newBook).subscribe(
        (response) => {
          console.log('Book updated successfully', response);
          this.bookUpdated.emit();
          this.closeBox();
        },
        (error) => {
          console.error('Error updating book', error);
        }
      );
    } else {
      this.booksService.addBook(this.newBook).subscribe(
        (response) => {
          console.log('Book saved successfully', response);
          this.bookUpdated.emit();
          this.closeBox();
        },
        (error) => {
          console.error('Error saving book', error);
        }
      );
    }
  }

  deleteBook(): void {
    this.booksService.deleteBook(this.book.id).subscribe(
      (response) => {
        console.log('Book deleted successfully', response);
        this.bookUpdated.emit();
        this.closeBox();
      },
      (error) => {
        console.error('Error deleting book', error);
      }
    );
  }

  closeBox(): void {
    this.valueTemplateBookView.emit(false);
  }

  loadGenres(): void {
    this.genresService.getAllGenres().subscribe(
      (data: IGenre[]) => {
        this.genres = data.sort((a, b) => a.name.localeCompare(b.name));
      },
      (error) => {
        console.error('Error fetching genres', error);
      }
    );
  }

  loadAuthors(): void {
    this.authorsService.getAllAuthors().subscribe(
      (data: IAuthor[]) => {
        this.authors = data.sort((a, b) => a.name.localeCompare(b.name));
      },
      (error) => {
        console.error('Error fetching authors', error);
      }
    );
  }

  addGenre(event: Event): void {
    const target = event.target as HTMLSelectElement; // Type assertion
    const selectedGenre = target.value;
    
    const genre = this.genres.find(g => g.name === selectedGenre);
    if (genre && !this.newBook.genres.includes(genre.name)) {
      this.newBook.genres.push(genre.name);
    }
  }

  removeItem(genre: string): void {
    this.newBook.genres = this.newBook.genres.filter(g => g !== genre);
  }
}
