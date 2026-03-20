import { Component, OnInit } from '@angular/core';
import { Products } from '../product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  newProductForm: Products = {
    id: '',
    name: '',
    price: 0,
  };
  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      const id = Number(param.get('id'));
      this.getProductsById(id);
    });
  }
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  getProductsById(id: number) {
    this.productService.getProductsById(id).subscribe((data) => {
      this.newProductForm = data;
    });
  }

  updateProduct() {
    this.productService.updateProduct(this.newProductForm).subscribe({
      next: () => {
        this.router.navigate(['/products/home']);
      },
      error: (e) => console.error(e),
    });
  }
}
