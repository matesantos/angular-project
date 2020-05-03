import { async } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product = {
    name:'',
    price: null
  }

  constructor(private service: ProductService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.readById(id).subscribe(
      product => this.product = product ,
      error => this.error(error, 'Não foi possível a Lista de Produtos.')
    );
  }

  updateProduct(): void {
    this.service.update(this.product).subscribe(
      () => {
        this.service.showMessage('Produto Atualizado com Sucesso.');
        this.cancel();
      },
      error => this.error(error, 'Não foi possível atualizar o Produto.')
    )
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

  error(error: any, msg: string) {
    this.service.showMessage(msg,true)
    console.error(error)
  }
}
