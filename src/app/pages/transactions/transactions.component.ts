import { Component, OnInit } from '@angular/core';

import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  public trans = [];
  public categories = [];
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
    this.getTransactions();
    this.transactionService.getCategores().subscribe(ret=>{
      this.categories = ret;
    })
  }

  toggleTransactionForm() {
    this.showTransactionForm = !this.showTransactionForm;
  }

  getTransactions() {
    console.log(this.filters);
    this.transactionService.getList(this.filters).subscribe(ret=>{
      this.trans = ret;
    });
  }
}
