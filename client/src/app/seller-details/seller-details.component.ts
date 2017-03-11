import { Component, OnInit } from '@angular/core';
import { SellersService, Seller, SellerProduct } from '../sellers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductDlgComponent } from '../product-dlg/product-dlg.component';

@Component({
  selector: 'app-seller-details',
  templateUrl: './seller-details.component.html',
  styleUrls: ['./seller-details.component.css']
})
export class SellerDetailsComponent implements OnInit {

  seller: Seller;
  products: SellerProduct[];
  top10products: SellerProduct[];

  constructor(private service: SellersService, private route: ActivatedRoute,
              private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.route.params.subscribe(p => {

      this.service.getSellerById(p['id']).subscribe(result => {
        this.seller = result;

        this.service.getSellerProducts(this.seller.id).subscribe(pro => {
          this.products = pro;
        });

        this.service.getSellerProducts(this.seller.id).subscribe(top => {
          this.top10products = top.sort(function(a, b){
                                          if ( a.quantitySold < b.quantitySold )
                                            return 1;
                                          if ( a.quantitySold > b.quantitySold )
                                            return -1;
                                          return 0;
                                        });
        });

        // TODO get top 10 products
      })

    });
  }

  onProductEdited(p: SellerProduct) {

    this.service.updateProduct(p, this.seller.id).subscribe(result => {
      // TODO: show toaster
      console.log(result);
    });
  }

  addProduct() {
    const modalInstance = this.modalService.open(ProductDlgComponent);

    modalInstance.componentInstance.product = {
	    name: "",
	    price: "",
	    quantitySold: "",
	    quantityInStock: "",
	    imagePath: ""
    };

    modalInstance.result.then(obj => {
      this.service.addProduct(obj, this.seller.id).subscribe(result => {
        // TODO: show toaster
        console.log(obj);
  	  });
    }).catch(err => {
      // Dialog was closed using cancel.
    });
  }
}
