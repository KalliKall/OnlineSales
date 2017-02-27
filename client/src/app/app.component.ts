import { Component, OnInit} from '@angular/core';
import { SellersService, Seller } from './sellers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  //private seller: Seller[];
  private seller: Seller;

  constructor(private service: SellersService) { }
  
  ngOnInit() {
  		/*this.service.getSellers().subscribe(result => {
  			this.sellers = result;
  		});*/

  		this.service.getSellerById(1337).subscribe((result) => {
  			this.seller = result;
  		}, (err) => {
  			console.log("you fuckd up");
  		})
  }
}
