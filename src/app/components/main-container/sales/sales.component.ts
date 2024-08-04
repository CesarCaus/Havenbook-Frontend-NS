import { Component, OnInit } from '@angular/core';
import { SaleHistoryService } from '../../../services/sale-history.service';
import { ISaleHistory } from '../../../interfaces/isale-history';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss'
})
export class SalesComponent implements OnInit {

  constructor(private saleHistoryService: SaleHistoryService) {}
  saleHistory!: ISaleHistory[];

  ngOnInit(): void {
      this.loadSaleHistory()
  }

  loadSaleHistory() {
    this.saleHistoryService.getSaleHistories().subscribe(saleHistory => {
      this.saleHistory = saleHistory;
    });
  }

  getTrib(sale: ISaleHistory): number{
    
  let value = 0;

    sale.books.forEach(element => {
      value += element.value;
    });

    return sale.totalValue - value;

  }

}
