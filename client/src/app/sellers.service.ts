import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/rx'

export class Seller {
	id: number;
	name: string;
	category: string;
	imagePath: string;
}

export class SellerProduct {
	id: number;
	name: string;
	price: number;
	quantitySold: number;
	quantityInStock: number;
	imagePath: string;
}

@Injectable()
export class SellersService {

  constructor(private http: Http) { }


  getSellers(): Observable<Seller[]> {
  	return this.http.get('http://localhost:5000/api/sellers')
  	.map(response =>{
  		return <Seller[]> response.json();
  	});
  }

   getSellerById(id: number): Observable<Seller> {
  	return this.http.get('http://localhost:5000/api/sellers/' + id)
  	.map(response =>{
  		return <Seller> response.json();
  	});
  }

  getSellerProducts(id: number): Observable<SellerProduct[]> {
	  return this.http.get('http://localhost:5000/api/sellers/' + id + '/products')
	  	.map(response => {
			return <SellerProduct[]> response.json();
		  });
  }

  addSeller(newSeller: Seller): Observable<Seller> {
    return this.http.post('http://localhost:5000/api/sellers', newSeller)
        .map(response => {
			return <Seller> response.json();
		});
  }

  addProduct(newProduct: SellerProduct, id: number): Observable<SellerProduct> {
    return this.http.post('http://localhost:5000/api/sellers/' + id + '/products', newProduct)
        .map(response => {
			return <SellerProduct> response.json();
		});
  }

  updateProduct(updatedProduct: SellerProduct, id: number): Observable<SellerProduct> {
    return this.http.put('http://localhost:5000/api/sellers/' + id + '/products/' + updatedProduct.id, updatedProduct)
        .map(response => {
			return <SellerProduct> response.json();
		});
  }

  updateSeller(updatedSeller: Seller, id: number): Observable<Seller> {
    return this.http.put('http://localhost:5000/api/sellers/' + id, updatedSeller)
        .map(response => {
			return <Seller> response.json();
		});
  }
}
