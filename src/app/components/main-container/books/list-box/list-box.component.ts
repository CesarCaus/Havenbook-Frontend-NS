import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthorsService } from '../../../../services/authors.service';
import { GenresService } from '../../../../services/genres.service';
import { IGenre } from '../../../../interfaces/IGenre.interface';
import { IAuthor } from '../../../../interfaces/IAuthor.interface';

@Component({
  selector: 'app-list-box',
  templateUrl: './list-box.component.html',
  styleUrls: ['./list-box.component.scss']
})
export class ListBoxComponent implements OnInit {

  @Output() valueTemplateListBox = new EventEmitter<boolean>();
  @Input() listType!: string;

  authors!: IAuthor[];
  genres!: IGenre[];
  inputGenre: IGenre = {id: 0, name: ''};
  inputAuthor: IAuthor = {id: 0, name: ''};

  constructor(private authorsService: AuthorsService,
              private genresService: GenresService) {}

  ngOnInit(): void {
    this.loadGenres();
    this.loadAuthors();
  }

  loadGenres() {
    this.genresService.getAllGenres().subscribe(
      (data: IGenre[]) => {
        this.genres = data;
        this.genres.sort((a, b) => a.name.localeCompare(b.name));
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
        this.authors.sort((a, b) => a.name.localeCompare(b.name));
      },
      error => {
        console.error('Error fetching authors', error);
      }
    );
  }

  removeAuthor(item: IAuthor): void {
    this.authorsService.deleteAuthor(item.id).subscribe(
      () => {
        this.loadAuthors();
      },
      error => {
        console.error('Error deleting author', error);
      }
    );
  }

  removeGenre(item: IGenre): void {
    this.genresService.deleteGenre(item.id).subscribe(
      () => {
        this.loadGenres();
      },
      error => {
        console.error('Error deleting genre', error);
      }
    );
  }

  editGenre(item: IGenre): void {
    this.inputGenre = { ...item };
  }

  saveGenre(): void {
    if (this.inputGenre.id != 0) {
      this.genresService.updateGenre(this.inputGenre.id, this.inputGenre).subscribe(
        () => {
          this.loadGenres();
          this.inputGenre = { id: 0, name: '' };
        },
        error => {
          console.error('Error saving genre', error);
        });
    } else {
      this.genresService.addGenre(this.inputGenre).subscribe(
        () => {
          this.loadGenres();
          this.inputGenre = { id: 0, name: '' };
        },
        error => {
          console.error('Error adding genre', error);
        }
      );
    }
  }

  editAuthor(item: IAuthor): void {
    this.inputAuthor = item;  
  }

  saveAuthor(): void {
    if (this.inputAuthor.id != 0) {
      this.authorsService.updateAuthor(this.inputAuthor.id, this.inputAuthor).subscribe(
        () => {
          this.loadAuthors();
          this.inputAuthor = { id: 0, name: '' };
        },
        error => {
          console.error('Error saving author', error);
        });
    } else {
      this.authorsService.addAuthor(this.inputAuthor).subscribe(
        () => {
          this.loadAuthors();
          this.inputAuthor = { id: 0, name: '' };
        },
        error => {
          console.error('Error adding author', error);
        }
      );
    }
  }

  closeBox(): void {
    this.valueTemplateListBox.emit(false);
  }
}
