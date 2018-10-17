import { Injectable } from '@angular/core';
import {menu} from './menu';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }
  getMenu = () =>  {
    return menu;
  }
}
