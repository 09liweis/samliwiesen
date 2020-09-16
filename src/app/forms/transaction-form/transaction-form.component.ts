import { ViewChild, Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { TransactionService } from '../../services/transaction.service';
import { PlaceService } from '../../services/place.service';
import { } from 'googlemaps';
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
  autocompleteInput: string;
  @ViewChild('addresstext') addresstext: any;
  public map = null;
  public mapOption = {
    center:null,
    zoom:10
  }

  constructor(
    private transactionService: TransactionService,
    private placeService: PlaceService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    console.log(this.selectedId);
    if (this.route.snapshot.params['id'] != 'new') {
      // this.transaction._id = this.route.snapshot.params['id'];
      // this.transactionService.getDetail(this.transaction._id).subscribe(b => {
      //   this.transaction = b;
      // })
    } else {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const m = month > 9 ? month : `0${month + 1}`;
      const day = now.getDate();
      const d = day > 9 ? day : `0${day}`;
      this.transaction.date = `${year}-${m}-${d}`;
    }
    // this.searchPlaces('axd');
    this.initMap();
  }

  initMap():void {
    this.map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 13
    });
    navigator.geolocation.getCurrentPosition(({coords})=>{
      const {latitude,longitude} = coords;
      this.mapOption.center = {lat:latitude,lng:longitude};
      this.map.setCenter(this.mapOption.center);
    },
    (err)=>{

    },{
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });
  }
  
  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(
      this.addresstext.nativeElement,
      {types: ['establishment']}// 'establishment' / 'address' / 'geocode'
    );
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
    });
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

  searchPlaces(name){
    this.placeService.getList(name).subscribe(places=>{
      console.log(places);
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
