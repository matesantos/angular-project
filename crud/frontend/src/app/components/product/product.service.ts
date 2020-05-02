import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  base_url:string = "http://localhost:3001/products"

  constructor(private snackbar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string) :void{
    this.snackbar.open(msg, 'X',{
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  create(product:Product): Observable<Product>{
    return this.http.post<Product>(this.base_url, product)
  }

  read(): Observable<Product[]>{
    return this.http.get<Product[]>(this.base_url)
  }

  error<T>(error:T): void{
    this.showMessage(`Não foi possível carregar os ${error} cadastrados`)
    console.error(error)
  }


}
