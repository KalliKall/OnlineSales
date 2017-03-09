import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export class Product {
  id: number;
	name: string;
	price: number;
	quantitySold: number;
	quantityInStock: number;
	imagePath: string;
}

@Component({
  selector: 'app-product-dlg',
  templateUrl: './product-dlg.component.html',
  styleUrls: ['./product-dlg.component.css']
})
export class ProductDlgComponent implements OnInit {

  product: Product;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  onCancel() {
    this.activeModal.dismiss();
  }

  onOk() {
    this.activeModal.close(this.product);
  }

}
