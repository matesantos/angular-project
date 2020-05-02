import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

  products: Product[]

  constructor(private service:ProductService) { }

  ngOnInit(): void {
    this.service.read().subscribe(
      products =>this.success(products),
      error=> this.error(error))
  }

  success(products:Product[]): void{
    this.products = products
    console.log(this.products)
  }

  error(error:any): void{
    this.service.showMessage('Não foi possível carregar os produtos cadastrados.')
    console.error(error)
  }

}
