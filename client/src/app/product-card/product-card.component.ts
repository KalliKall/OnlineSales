import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { SellersService, SellerProduct, Seller } from '../sellers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductDlgComponent } from '../product-dlg/product-dlg.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input()
  product: SellerProduct;

  @Output()
  productUpdated = new EventEmitter();

  constructor(private service: SellersService,
              private modalService: NgbModal,
              public toastr: ToastsManager, 
              vcr: ViewContainerRef) { 
                this.toastr.setRootViewContainerRef(vcr);
              }

  ngOnInit() {
  }

  onEdit() {
    const modalInstance = this.modalService.open(ProductDlgComponent);

    let copy = new SellerProduct();
    copy.id = this.product.id;
    copy.name = this.product.name;
    copy.price = this.product.price;
    copy.quantitySold = this.product.quantitySold;
    copy.quantityInStock = this.product.quantityInStock;
    copy.imagePath = this.product.imagePath;

    modalInstance.componentInstance.product = copy;

    modalInstance.result.then(obj => {
      if(obj.name !== "") {
        this.product.id = obj.id;
        this.product.name = obj.name;
        this.product.imagePath = obj.imagePath;

        // parsing numbers to int
        obj.price = parseInt(obj.price);
        obj.quantitySold = parseInt(obj.quantitySold);
        obj.quantityInStock = parseInt(obj.quantityInStock);
        
        this.product.price = obj.price;
        this.product.quantitySold = obj.quantitySold;
        this.product.quantityInStock = obj.quantityInStock;

        this.productUpdated.emit(obj);
      }
      else {
        this.toastr.error('Gat ekki uppfært seljanda!','Villa!');
      }
    }).catch(err => {
      //console.log("Dialog was closed using Cansel");
    });
  }

}
