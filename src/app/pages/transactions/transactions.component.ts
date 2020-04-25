import { Component, OnInit } from '@angular/core';

import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  public trans = [];
  public filters = {
    limit:30,
    date: '',
    category: ''
  }

  constructor(
    private transactionService: TransactionService,
  ) { }

  ngOnInit() {
    console.log('test');
    this.transactionService.getList().subscribe(ret => {
      this.trans = ret;
    });
  }

  getTransactions() {
    console.log(this.filters);
    this.transactionService.getList(this.filters).subscribe(ret=>{
      this.trans = ret;
    });
  }
}
