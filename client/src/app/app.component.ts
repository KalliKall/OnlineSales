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
  title = 'OnlineSales';

  //private seller: Seller[];
  private seller: Seller;

  products: SellerProduct[];

  constructor(private service: SellersService, private modalService: NgbModal) { }
  
  ngOnInit() {
  		/*this.service.getSellers().subscribe(result => {
  			this.sellers = result;
  		});

  		this.service.getSellerById(1337).subscribe((result) => {
  			this.seller = result;
  		}, (err) => {
  			console.log("you fuckd up");
  		})

      this.service.getSellerProducts(1).subscribe(result => {
        this.products = result;
      });*/

  }

  onProductEdited(p: SellerProduct) {
    // TODO: upfæra vöruna í gegnum service klasann
    console.log(p);
  }

  addSeller() {
    const modalInstance = this.modalService.open(SellerDlgComponent);
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
