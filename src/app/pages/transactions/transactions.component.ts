import { Component, OnInit } from '@angular/core';

import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  public trans = [];

  constructor(
    private transactionService: TransactionService,
  ) { }

  ngOnInit() {
    this.transactionService.getList().subscribe(ret => {
      this.trans = ret;
    });
  }
}
