import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SellerProduct } from '../sellers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductDlgComponent } from '../product-dlg/product-dlg.component';

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

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  onEdit() {
    // láta t.d. poppa upp modal glugga til að edita
    //this.product.name = "smuuu";
    //this.productUpdated.emit(this.product);
    console.log("það held ég");

    const modalInstance = this.modalService.open(ProductDlgComponent);

    modalInstance.componentInstance.product = this.product;

    modalInstance.result.then(obj => {
      console.log("Dialog was closed using OK");
      this.productUpdated.emit(obj);
    }).catch(err => {
      console.log("Dialog was closed using Cansel");
    });
  }

}
