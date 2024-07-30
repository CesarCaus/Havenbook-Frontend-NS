import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBook } from '../../../../interfaces/IBook.interface';

@Component({
  selector: 'app-book-view-box',
  templateUrl: './book-view-box.component.html',
  styleUrl: './book-view-box.component.scss'
})
export class BookViewBoxComponent implements OnInit{
 
  @Output() valueTemplateBookView = new EventEmitter<boolean>();
  @Input() bookInfo!: IBook;

  book!: IBook;

  ngOnInit(): void {
    this.book = this.bookInfo;
  }

  closeBox() {
    this.valueTemplateBookView.emit(false);
  }
}
