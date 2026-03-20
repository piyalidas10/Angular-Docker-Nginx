import { Component } from '@angular/core';
import { Products } from '../product';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  newProductForm: Products = {
    id: '',
    name: '',
    price: 0,
  };
  newProductId: string = '';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      // Find the maximum ID
      const maxId = Math.max(
        ...products.map((product) => Number(product.id)),
        100
      ); // Using 100 as the fallback to avoid NaN
      // Increment the maximum ID for the new product
      const newId = maxId + 1;
      // Assign the ID directly
      this.newProductForm.id = newId.toString();
    });
  }

  createProduct() {
    this.productService.createProduct(this.newProductForm).subscribe({
      next: () => {
        this.router.navigate(['/products/home']);
      },
      error: (e) => {
        console.error(e);
      },
    });
  }
}
