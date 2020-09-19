import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  public categoryTp = '$in';
  public filters = {
    limit:'all',
    date: '',
    category: {
      '$in':[]
    }
  };
  public showTransactionForm = false;

  constructor(
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    const {year,m} = getToday();
    this.filters.date = `${year}-${m}`;
    this.getTransactions(this.filters);
    this.transactionService.getCategores().subscribe(ret=>{
      this.categories = ret;
    });
    const tId = this.route.snapshot.params['id'];
    if (tId) {
      this.selectedId = tId;
      this.toggleTransactionForm();
    }
  }

  toggleCategory() {
    if (this.categoryTp == '$in') {
      delete this.filters.category['$in'];
      this.filters.category['$nin'] = [];
      this.categoryTp = '$nin';
    } else {
      delete this.filters.category['$nin'];
      this.filters.category['$in'] = [];
      this.categoryTp = '$in'
    }
  }

  selectCategory(c) {
    const key = this.categoryTp;
    const idx = this.filters.category[key].indexOf(c);
    if (idx > -1) {
      this.filters.category[key].splice(idx,1);
    } else {
      this.filters.category[key].push(c);
    }
  }

  toggleTransactionForm() {
    this.showTransactionForm = !this.showTransactionForm;
  }

  getTransactions(filters) {
    var opt = Object.assign({},filters);
    if (opt.category[this.categoryTp].length == 0) {
      delete opt.category;
    }
    this.loading = true;
    this.trans = [];
    this.transactionService.getList(opt).subscribe(ret=>{
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
