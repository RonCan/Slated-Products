import { Injectable } from '@angular/core';
import { menu } from './menu';
import {database} from './database';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}
  getMenu = () => {
    return menu;
  };
  getProduct = (id: number) => {
    return database[id];
};
}
