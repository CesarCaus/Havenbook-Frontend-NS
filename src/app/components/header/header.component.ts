import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  User: string = "César Caus";
  CurrentDate: string;

  constructor() {
    this.CurrentDate = HeaderComponent.formatDate();
  }

  static formatDate(): string {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    
    return `${formattedDay}/${formattedMonth}/${year}`;
  }

}
