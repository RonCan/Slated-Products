import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  menu: any;
  selectedProduct: any;
  constructor(
    public productService: ProductService,
    public snackBar: MatSnackBar
  ) {}
  getMenu(): void {
    this.menu = this.productService.getMenu();
  }

  select(product): void {
    this.selectedProduct = product;
    const url = window.location.href.indexOf('Slated-Products') > -1 ? `/Slated-Products/${product.id}` : `/${product.id}`; // Since Github Pages is hosting on a relative path
    window.history.replaceState({}, '', url); // since we are showing component as child element we don't want to route to this url because that would instantiate the same component twice
  }

  onDialogClosed(event): void {
    this.selectedProduct = null;
    if(event.action !== 'back') {
      this.snackBar.open(
        `${event.quantity} ${event.title} for a total of $${
          event.total
          } with Milk: ${event.milk || 'Not Selected'}, Syrup: ${event.syrup ||
        'Not Selected'} placed`,
        'OK',
        {}
      );
    }
  }

  ngOnInit() {
    this.getMenu();
  }
}
