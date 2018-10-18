import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  menu: any;
  selectedProduct: any;
  constructor(private productService: ProductService) {}
  getMenu(): void {
    this.menu = this.productService.getMenu();
  }

  select(product): void {
    this.selectedProduct = product;
    window.history.replaceState({}, '', `/${product.id}`); // since we are showing component as child element we don't want to route to this url because that would instantiate the same component twice
  }

  onDialogClosed(): void {
    this.selectedProduct = null;
  }

  ngOnInit() {
    this.getMenu();
  }
}
