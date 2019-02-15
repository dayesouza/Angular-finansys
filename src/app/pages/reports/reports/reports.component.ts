import { CategoryService } from './../../categories/shared/category.service';
import { EntryService } from './../../entries/shared/entry.service';
import { Category } from './../../categories/shared/category.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import currencyFormatter from 'currency-formatter';
import { Entry } from '../../entries/shared/entry.model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  expenseTotal: any = 0;
  revenueTotal: any = 0;
  balance: any = 0;

  expenseChartData: any;
  revenueChartData: any;

  chartOptions = {
    scales: {
      yAxes: [
        { ticks: {
          beginAt0: true
        }
      }
      ]
    }
  };

  categories: Category[] = [];
  entries: Entry[] = [];

  @ViewChild('month') month: ElementRef = null;
  @ViewChild('year') year: ElementRef = null;

  constructor(private entryService: EntryService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe(categories => this.categories = categories);
  }

  generateReports() {
    const month = this.month.nativeElement.value;
    const year = this.year.nativeElement.value;

    if ( !month || !year ) {
      alert('Please select a month and year');
    }
    else {
      this.entryService.getByMonthAndYear(month, year).subscribe(this.setValues.bind(this));
    }
  }

  private setValues(entries: Entry[]) {
    this.entries = entries;
    this.calculateBalance();
    this.setChartData();
  }

  private calculateBalance() {
    let expenseTotal = 0;
    let revenueTotal = 0;

    this.entries.forEach(entry => {
      if (entry.type === 'revenue') {
        revenueTotal += currencyFormatter.unformat(entry.amount);
      }
      else {
        expenseTotal += currencyFormatter.unformat(entry.amount);
      }
    });

    this.expenseTotal = currencyFormatter.format(expenseTotal);
    this.revenueTotal = currencyFormatter.format(revenueTotal);

    this.balance = currencyFormatter.format(revenueTotal = expenseTotal);
  }

  private setChartData() {
    const chartData = [];
    this.categories.forEach(category => {
      const filteredEntries = this.entries.filter (
        entry => (entry.categoryId === category.id)
        && (entry.type === 'revenue')
      );

      // If found, show on the graph
      if (filteredEntries.length > 0) {
        const totalAmount = filteredEntries.reduce(
          (total, entry) => total + currencyFormatter.unformat(entry.amount), 0
        );

        chartData.push({
          categoryName: category.name,
          totalAmount: totalAmount
        });
      }

    });

    this.revenueChartData = {
      labels: chartData.map(item => item.categoryName),
      datasets: [{
        label: 'Revenues',
        backgroundColor: '#9CCC65',
        data: chartData.map(item => item.totalAmount)
      }]
    };
  }

}
