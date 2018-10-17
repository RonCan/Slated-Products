import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';

export interface DialogData {
  animal: string;
  name: string;
  id: number;
}

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.css']
})
export class DetailsModalComponent implements OnInit {
  id: number;
  animal: string;
  constructor(public dialog: MatDialog, private route: ActivatedRoute, private location: Location) {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.openDialog();
  }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {name: 'Haroon', animal: 'Lion', id: this.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.location.back();
      this.animal = result;
    });
  }

}

@Component({
  selector: 'details-modal.template',
  templateUrl: 'details-modal.template.html',
  styleUrls: ['./details-modal.component.css']
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  favoriteSeason: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  onNoClick(): void {
    this.dialogRef.close();
  }

}
