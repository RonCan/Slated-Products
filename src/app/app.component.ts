import {Component, OnInit} from '@angular/core';
import {ProductService} from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private productService: ProductService) {
  }
  menu = {};
  getMenu(): void {
    this.menu = this.productService.getMenu();
  }

  ngOnInit() {
    this.getMenu();
  }
}
