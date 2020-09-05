import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { TransactionService } from '../../services/transaction.service';
// import { Transaction } from '../../models/transaction';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {
  @Input() selectedId;
  @Input() categories;
  public transaction = {
    _id: '',
    title: '',
    price: 0,
    date: '',
    category: '',
    place: {}
  };

  constructor(
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    console.log(this.selectedId);
    if (this.route.snapshot.params['id'] != 'new') {
      this.transaction._id = this.route.snapshot.params['id'];
      this.transactionService.getDetail(this.transaction._id).subscribe(b => {
        this.transaction = b;
      })
    } else {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const m = month > 9 ? month : `0${month + 1}`;
      const day = now.getDate();
      const d = day > 9 ? day : `0${day}`;
      this.transaction.date = `${year}-${m}-${d}`;
    }
  }
  
  ngAfterViewInit() {
  }

  selectCategory(c) {
    this.transaction.category = c;
  }
  
  submit(back: boolean):void {
    this.transactionService.submit(this.transaction).subscribe(transaction => {
      if (transaction) {
        alert('保存成功啦～～～～')
      }
      if (back) {
        this.router.navigate(['/']); 
      }
    });
  }
  
  // delete(id: string): void {
  //   this.transactionService.delete(id).subscribe(res => {
  //     if (res == 'ok') {
  //       this.router.navigate(['/']);
  //     }
  //   });
  // }
}
