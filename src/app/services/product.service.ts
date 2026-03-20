import { Injectable } from '@angular/core';
import { Products } from '../products/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = 'http://localhost:3000/products';
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Products[]>(this.url);
  }
  createProduct(newProduct: Products) {
    return this.http.post<Products>(this.url, newProduct);
  }
  getProductsById(id: number) {
    return this.http.get<Products>(`${this.url}/${id}`);
  }
  updateProduct(data: Products) {
    return this.http.put(`${this.url}/${data.id}`, data);
  }
  deleteProduct(id: string) {
    return this.http.delete<Products>(`${this.url}/${id}`);
  }
}
