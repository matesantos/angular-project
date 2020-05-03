import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product = {
    name:'',
    price:null
  }

  constructor(private service: ProductService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    //o sinal de '+' converter para tipo number
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.readById(id).subscribe(
      product => this.product = product,
      error => this.error(error, 'Produto não encontrado. Tente novamente')
      )
  }

  deleteProduct(): void {
      this.service.delete(this.product.id).subscribe(
      () => this.success(),
      error => this.error(error,'O produto não poder deletado. Tente novamente')
    )
  }

  success(): void{
    this.service.showMessage('Produto Deletado com Sucesso')
    this.router.navigate(['/products'])
  }

  error(error:any, msg): void{
    this.service.showMessage(msg, true)
    console.error(error)
  }

  cancel():void{
    this.router.navigate(['/products'])
  }

}
