import { Component, OnInit } from '@angular/core';
import { StatisticService } from '../../../services/statistic.service';
import { FormBuilder, FormGroup } from '@angular/forms'; // Importa FormBuilder e FormGroup

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  filterForm: FormGroup;

  constructor(
    private statisticService: StatisticService,
    private fb: FormBuilder 
  ) {
  
    this.filterForm = this.fb.group({
      startDate: [''],
      endDate: ['']
    });
  }

  maxValue: number = 0;
  relativeWidths: string[] = [];
  relativeWidthsBook: string[] = [];

  authorSales: { author: string, quantity: number }[] = [];
  bestSellingBooks: { title: string, count: number }[] = [];
  totalRevenue!: number;
  totalBookCount!: number;
  totalBooksNeverSold!: number;

  ngOnInit(): void {
    this.loadStatistics(); // Carrega as estatísticas sem filtro inicialmente
  }

  loadStatistics(): void {
    this.statisticService.getAuthorSalesStatistics().subscribe(
      (data: { author: string, quantity: number }[]) => {
        this.authorSales = data;
        this.authorSales.sort((a, b) => b.quantity - a.quantity);
        this.calculateRelativeWidths();
      },
      (error) => console.error(error)
    );

    this.statisticService.getTotalRevenue().subscribe(
      (data: number) => {
        this.totalRevenue = data;
      },
      (error) => console.error(error)
    );

    this.statisticService.getTotalBookCount().subscribe(
      (data: number) => {
        this.totalBookCount = data;
      },
      (error) => console.error(error)
    );

    this.statisticService.getBestSellingBooks().subscribe(
      (data: { title: string, count: number }[]) => {
        this.bestSellingBooks = data;
        this.bestSellingBooks.sort((a, b) => b.count - a.count);
        this.calculateRelativeWidthsBooks();
      },
      (error) => console.error(error)
    );

    this.statisticService.getNeverSoldBookCount().subscribe(
      (data: number) => {
        this.totalBooksNeverSold = data;
      },
      (error) => console.error(error)
    );
  }

  applyDateFilter(): void {
    const { startDate, endDate } = this.filterForm.value;

    this.statisticService.getAuthorSalesStatisticsByDate(startDate, endDate).subscribe(
      (data: { author: string, quantity: number }[]) => {
        this.authorSales = data;
        this.authorSales.sort((a, b) => b.quantity - a.quantity);
        this.calculateRelativeWidths();
      },
      (error) => console.error(error)
    );

    this.statisticService.getTotalRevenueByDate(startDate, endDate).subscribe(
      (data: number) => {
        this.totalRevenue = data;
      },
      (error) => console.error(error)
    );

    this.statisticService.getTotalBookCountByDate(startDate, endDate).subscribe(
      (data: number) => {
        this.totalBookCount = data;
      },
      (error) => console.error(error)
    );

    this.statisticService.getBestSellingBooksByDate(startDate, endDate).subscribe(
      (data: { title: string, count: number }[]) => {
        this.bestSellingBooks = data;
        this.bestSellingBooks.sort((a, b) => b.count - a.count);
        this.calculateRelativeWidthsBooks();
      },
      (error) => console.error(error)
    );

    this.statisticService.getNeverSoldBookCountByDate(startDate, endDate).subscribe(
      (data: number) => {
        this.totalBooksNeverSold = data;
      },
      (error) => console.error(error)
    );
  }

  resetFilters(): void {
    this.filterForm.reset();

    this.loadStatistics();
  }

  calculateRelativeWidths(): void {
    if (this.authorSales.length > 0) {
      this.maxValue = 20; 
      this.relativeWidths = this.authorSales.map(item => `${(item.quantity / this.maxValue) * 80}%`);
    }
  }

  calculateRelativeWidthsBooks(): void {
    if (this.bestSellingBooks.length > 0) {
      this.maxValue = 15; 
      this.relativeWidthsBook = this.bestSellingBooks.map(item => `${(item.count / this.maxValue) * 80}%`);
    }
  }
}
