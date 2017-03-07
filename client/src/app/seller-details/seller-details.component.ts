import { Component, OnInit } from '@angular/core';
import { SellersService, Seller, SellerProduct } from '../sellers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(p => {

      this.service.getSellerById(p['id']).subscribe(result => {
        this.seller = result;

        this.service.getSellerProducts(this.seller.id).subscribe(pro => {
          this.products = pro;
        });

        // TODO get top 10 products
      })

    });
  }

  onProductEdited(p: SellerProduct) {
    // TODO: upfæra vöruna í gegnum service klasann
    console.log("var var uppfærð");
    console.log(p);
  }

}
