import { Component, inject, OnInit } from '@angular/core';
import { Products } from '../product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products: Products[] = [];
  private productService = inject(ProductService);

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService
      .getProducts()
      .subscribe((data) => (this.products = data));
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter((product) => product.id != id);
    });
  }
}
