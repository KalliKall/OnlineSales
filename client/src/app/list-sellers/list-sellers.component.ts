import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { SellersService, Seller, SellerProduct } from '../sellers.service';
import { SellerDlgComponent } from '../seller-dlg/seller-dlg.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-list-sellers',
  templateUrl: './list-sellers.component.html',
  styleUrls: ['./list-sellers.component.css'],
  providers: [NgbTabset]
})
export class ListSellersComponent implements OnInit {

  sellers: Seller[];

  constructor(private service: SellersService, 
              private modalService: NgbModal,
              public toastr: ToastsManager, 
              vcr: ViewContainerRef) { 
                this.toastr.setRootViewContainerRef(vcr);
              }

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
      if(obj.name !== "") {
        this.service.addSeller(obj).subscribe(result => {
          // updating the seller list
          this.sellers.push(obj);

          // showing toaster
          this.toastr.success(obj.name + ' var bætt við seljendur!', 'Nýr seljandi!');
  	    }, (err) => {
          this.toastr.error('Gat ekki bætt við seljanda!', 'Villa!');
        });
      }
      else {
        this.toastr.error('Seljandi þarf að hafa nafn!', 'Villa!');
      }
      
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
      if(obj.name !== "") {
        this.service.updateSeller(obj, obj.id).subscribe(result => {
          s.name = copy.name;
          s.imagePath = copy.imagePath;
          s.category = copy.category;

          // showing toaster
          this.toastr.success(obj.name + ' var uppfærður', 'Uppfærður seljandi!');
  	    }, (err) => {
          this.toastr.error('Gat ekki uppfært seljanda!','Villa!');
        });
      }
      else {
        this.toastr.error('Seljandi þarf að hafa nafn!', 'Villa!');
      }
    }).catch(err => {
      // Dialog was closed using cancel.
    });
  }

}
