import { Component, OnInit } from '@angular/core';
import {getToday} from '../../helpers';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  public trans = [];
  public categories = [];
  public selectedId = '';
  public total = 0;
  public loading = false;
  public filters = {
    limit:'all',
    date: '',
    category: ''
  };
  public showTransactionForm = false;

  constructor(
    private transactionService: TransactionService,
  ) { }

  ngOnInit() {
    const {year,m} = getToday();
    this.filters.date = `${year}-${m}`;
    this.getTransactions(this.filters);
    this.transactionService.getCategores().subscribe(ret=>{
      this.categories = ret;
    })
  }

  toggleTransactionForm() {
    this.showTransactionForm = !this.showTransactionForm;
  }

  getTransactions(filters) {
    this.loading = true;
    this.trans = [];
    this.transactionService.getList(filters).subscribe(ret=>{
      this.loading = false;
      this.trans = ret;
      this.total = 0;
      for (let i = 0; i < ret.length; i++) {
        const transaction = ret[i];
        this.total += Math.abs(transaction.price);
      }
    });
  }
}
