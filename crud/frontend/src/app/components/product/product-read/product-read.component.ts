import { ProductReadDataSource } from './product-read-datasource';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<Product>;
  displayedColumns = ['id','name','price', 'action']
  
  constructor(private service:ProductService, private products: ProductReadDataSource) { }

  ngOnInit(): void {
    this.service.read().subscribe(
      productsFromDb => this.success(productsFromDb),
      error=> this.error(error))
  }

  success(productsFromDb:Product[]): void{
    this.products.data = [...productsFromDb]
    this.products.sort = this.sort;
    this.products.paginator = this.paginator;
    this.table.dataSource = this.products;
    this.initPaginatorProperties()
  }

  error(error:any): void{
    this.service.showMessage('Não foi possível carregar os produtos cadastrados.')
    console.error(error)
  }

  initPaginatorProperties(){
    this.paginator._intl.itemsPerPageLabel= 'Produtos por páginas:';
    this.paginator._intl.lastPageLabel = "Última página"
    this.paginator._intl.firstPageLabel = "Primeira página"
  }

}
