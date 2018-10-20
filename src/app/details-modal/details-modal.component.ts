import {
  Component,
  OnInit,
  Inject,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ProductService } from '../product.service';
import {AddOn, Product, Result} from './interfaces';

export interface DialogData {
  product: Product;
}

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.css'],
})
export class DetailsModalComponent implements OnInit {
  id: number;
  @Input()
  product: Product;
  @Output()
  dialogClosed = new EventEmitter<Result>();
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private location: Location,
    private productService: ProductService
  ) {
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    if (this.product) {
      setTimeout(() => this.openDialog());
    } else {
      this.product = this.productforID();
      setTimeout(() => this.openDialog());
    }
  }

  productforID(): any {
    return this.productService.getProduct(this.id);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      disableClose: true,
      data: { product: this.product },
    });

    dialogRef.afterClosed().subscribe(result => {
      const url = window.location.href.indexOf('Slated-Products') > -1 ? `/Slated-Products` : `/`; // Since Github Pages is hosting on a relative path
      window.history.replaceState({}, '', url);
      this.dialogClosed.emit(result);
    });
  }
}

@Component({
  selector: 'details-modal.template',
  templateUrl: 'details-modal.template.html',
  styleUrls: ['./details-modal.component.css'],
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.data = data;
  }
  selectedMilk: string;
  selectedSyrup: string;
  selectedOptions: any;
  chocolates: AddOn[] = this.data.product.extras.filter(extra => extra.id === 15345)[0].items;
  total: number = this.data.product.price;
  quantity = 1;
  currentMilkPrice = 0;
  currentSyrupPrice = 0;
  chocolades: string[] = [];
  addProduct(): void {
    this.quantity = this.quantity + 1;
    this.total = this.total + this.data.product.price;
  }
  removeProduct(): void {
    if (this.quantity > 1) {
      this.quantity = this.quantity - 1;
      this.total = this.total - this.data.product.price;
    }
  }

  milkChange(event, price): void {
    if (this.currentMilkPrice || price) {
      if (this.currentMilkPrice) {
        this.total = this.total - this.currentMilkPrice;
      }
      if (price) {
        this.total = this.total + price;
      }
    }
    this.currentMilkPrice = price;
  }

  syrupChange(event, price): void {
    if (this.currentSyrupPrice || price) {
      if (this.currentSyrupPrice) {
        this.total = this.total - this.currentSyrupPrice;
      }
      if (price) {
        this.total = this.total + price;
      }
    }
    this.currentSyrupPrice = price;
  }

  chocoladeChange(values): void {
    const removed = this.chocolades.filter(e => !values.find(a => e === a))[0];
    const added = values.filter(e => !this.chocolades.find(a => e === a))[0];
    if (added) {
      const obj = this.chocolates.filter(choc => choc.name === added)[0];
      this.total = this.total + obj.price;
    }
    if (removed) {
      const obj = this.chocolates.filter(choc => choc.name === removed)[0];
      this.total = this.total - obj.price;
    }
    this.chocolades = values;
  }

  closeDialog(action: string): void {
    this.dialogRef.close({title: this.data.product.name, quantity: this.quantity, milk: this.selectedMilk, syrup: this.selectedSyrup, total: this.total, action: action});
  }
}
