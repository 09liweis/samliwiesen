import { ViewChild, Component, OnInit, Input } from '@angular/core';

import { getToday } from '../../helpers';
import { TransactionService } from '../../services/transaction.service';
import { PlaceService } from '../../services/place.service';
// import { Transaction } from '../../models/transaction';

declare var google;

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {
  @Input() selectedId;
  @Input() categories;
  @Input() toggleTransactionForm;
  @Input() users;
  public transaction = {
    _id: '',
    title: '',
    price: 0,
    date: '',
    category: '',
    uid:'',
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
  ) { }

  ngOnInit() {
    console.log(this.selectedId);
    if (this.selectedId) {
      // this.transaction._id = this.route.snapshot.params['id'];
      // this.transactionService.getDetail(this.transaction._id).subscribe(b => {
      //   this.transaction = b;
      // })
    } else {
      const {year,m,d} = getToday();
      this.transaction.date = `${year}-${m}-${d}`;
    }
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
      const {place_id,formatted_address,name,geometry} = place;
      this.transaction.place = {
        place_id,
        name,
        address:formatted_address,
        lat:geometry.location.lat(),
        lng:geometry.location.lng(),
      };
      this.submit(true);
    });
  }

  selectCategory(c) {
    this.transaction.category = c;
  }

  selectUser(id) {
    this.transaction.uid = id;
  }
  
  submit(back: boolean):void {
    this.transactionService.submit(this.transaction).subscribe(transaction => {
      if (transaction) {
        alert('保存成功啦～～～～')
      }
      if (back) {
        this.toggleTransactionForm();
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
