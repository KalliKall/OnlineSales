import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { SellersService, Seller, SellerProduct } from '../sellers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductDlgComponent } from '../product-dlg/product-dlg.component';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-seller-details',
  templateUrl: './seller-details.component.html',
  styleUrls: ['./seller-details.component.css']
})
export class SellerDetailsComponent implements OnInit {

  seller: Seller;
  products: SellerProduct[];
  top10products: SellerProduct[];

  // true if seller got no products
  noProducts: Boolean = false;

  constructor(private service: SellersService, 
              private route: ActivatedRoute,
              private router: Router, 
              private modalService: NgbModal,
              public toastr: ToastsManager, 
              vcr: ViewContainerRef) { 
                this.toastr.setRootViewContainerRef(vcr);
              }

  ngOnInit() {
    this.route.params.subscribe(p => {

      this.service.getSellerById(p['id']).subscribe(result => {
        this.seller = result;

        this.service.getSellerProducts(this.seller.id).subscribe(pro => {
          // if seller has no products
          if(pro.length === 0) {
            this.noProducts = true;
          }

          this.products = pro;
        });

        this.service.getSellerProducts(this.seller.id).subscribe(top => {
          //
          this.top10products = top.sort(function(a, b){
                                          if ( a.quantitySold < b.quantitySold )
                                            return 1;
                                          if ( a.quantitySold > b.quantitySold )
                                            return -1;
                                          return 0;
                                        });
        });
      })

    });
  }

  onProductEdited(p: SellerProduct) {
    if(p.name !== "") {
      this.service.updateProduct(p, this.seller.id).subscribe(result => {

        // showing toaster
        this.toastr.success('Vara var uppfærð!', 'Uppfærð vara!');
      }, (err) => {
        this.toastr.error('Gat ekki upfært vöru!', 'Villa!');
      });
    }
    else {
      this.toastr.error('Vara þarf að hafa nafn!', 'Villa!');
    }
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
      if(obj.name !== "") {
        this.service.addProduct(obj, this.seller.id).subscribe(result => {
        
          // showing toaster
          this.toastr.success(obj.name + ' var bætt við vörur!', 'Ný vara!');

          // adding product to the list
          this.products.push(obj);

          this.noProducts = false;
  	    }, (err) => {
          this.toastr.error('Gat ekki bætt við vöru!', 'Villar!');
        });
      }
      else {
        this.toastr.error('Vara þarf að hafa nafn!', 'Villa!');
      }
    }).catch(err => {
      // Dialog was closed using cancel.
    });
  }
}
