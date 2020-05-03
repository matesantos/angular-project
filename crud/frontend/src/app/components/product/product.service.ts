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

  showMessage(msg: string, isError: boolean = false) :void{
    this.snackbar.open(msg, 'X',{
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  create(product:Product): Observable<Product>{
    return this.http.post<Product>(this.base_url, product)
  }

  read(): Observable<Product[]>{
    return this.http.get<Product[]>(this.base_url)
  }

  readById(id: number): Observable<Product>{
    return this.http.get<Product>(this.url(id));
  }

  update(product: Product): Observable<Product>{
    return this.http.put<Product>(this.url(product.id),product);
  }

   delete(id: number): Observable<Product>{
    return this.http.delete<Product>(this.url(id))
  }

  private url(id: number): string{
    return `${this.base_url}/${id}`
  }
}
