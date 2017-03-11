import { Component, OnInit } from '@angular/core';
import { SellersService, Seller, SellerProduct } from '../sellers.service';
import { SellerDlgComponent } from '../seller-dlg/seller-dlg.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-sellers',
  templateUrl: './list-sellers.component.html',
  styleUrls: ['./list-sellers.component.css'],
  providers: [NgbTabset]
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

    modalInstance.componentInstance.seller = {
      name: "",
      category: "",
      imagePath: ""
    };

    modalInstance.result.then(obj => {
      this.service.addSeller(obj).subscribe(result => {
        // TODO: show toaster
  	  });
    }).catch(err => {
      // Dialog was closed using cancel.
    });
  }

  editSeller(s: Seller) {
    const modalInstance = this.modalService.open(SellerDlgComponent);

    let copy = new Seller();
    copy.id = s.id;
    copy.name = s.name;
    copy.imagePath = s.imagePath;
    copy.category = s.category;


    modalInstance.componentInstance.seller = copy;

    modalInstance.result.then(obj => {
      this.service.updateSeller(obj, obj.id).subscribe(result => {
        // TODO: show toaster
        s.name = copy.name;
  	  });
    }).catch(err => {
      // Dialog was closed using cancel.
    });
  }

}
