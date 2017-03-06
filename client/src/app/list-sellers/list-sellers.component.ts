import { Component, OnInit } from '@angular/core';
import { SellersService, Seller, SellerProduct } from '../sellers.service';
import { SellerDlgComponent } from '../seller-dlg/seller-dlg.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-sellers',
  templateUrl: './list-sellers.component.html',
  styleUrls: ['./list-sellers.component.css']
})
export class ListSellersComponent implements OnInit {

  sellers: Seller[];

  constructor(private service: SellersService, private modalService: NgbModal) { }

  ngOnInit() {
    this.service.getSellers().subscribe(result => {
  			this.sellers = result;
  	});
  }

  addSeller() {
    const modalInstance = this.modalService.open(SellerDlgComponent);

    // TODO: klára þetta
    modalInstance.componentInstance.seller = {
      name: "Daniel",
      category: "Hannyrðir",
      imagePath: "http://example.com",
      id: 7
    };

    modalInstance.result.then(obj => {
      console.log("Dialog was closed using OK");
      console.log(obj);
    }).catch(err => {
      // ath taka afrit af gögnum ef notandi ýtir á cansel svo þau eiðast ekki

      console.log("Dialog was closed using Cansel");
      console.log(err);
    });
  }

}