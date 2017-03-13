import { Component, OnInit} from '@angular/core';
import { SellersService, Seller, SellerProduct } from './sellers.service';
import { SellerDlgComponent } from './seller-dlg/seller-dlg.component';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Netverslun';

  constructor() { }
  
  ngOnInit() {
  }
}
