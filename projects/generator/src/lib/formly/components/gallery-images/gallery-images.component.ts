import { Component, OnInit } from '@angular/core';
import {ModalComponent} from '../modal/modal.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
// import {ShareService} from '../../service/share.service';
// import {environment} from '../../../../../../environments/environment';
import {FieldType} from '@ngx-formly/core';
export interface IImage {
  id: number;
  image_alt: string;
  image_path: string;
}
const environment = {
  apiUrl: 'http://localhost:4000'
};

@Component({
  selector: 'app-gallery-images',
  templateUrl: './gallery-images.component.html',
  styleUrls: ['./gallery-images.component.scss']
})
export class GalleryImagesComponent extends FieldType implements OnInit {
  gallery: IImage[] = [];
  dialogConfig = new MatDialogConfig();
  constructor(public dialog: MatDialog) {
    super();
    this.dialogConfig.disableClose = false;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.data = {multiple: false};
    this.dialogConfig.height = '470';
    this.dialogConfig.width = '70%';
  }

  ngOnInit(): void {

  }

  onRemoveImageGallery(id: number) {
    this.model.gallery = this.gallery = this.gallery.filter((value) => value.id !== id);
  }

  uploadGalleryImages() {

    this.dialogConfig.data = {multiple: true};
    const dialogRef = this.dialog.open(ModalComponent, this.dialogConfig);
    dialogRef.componentInstance.OnImages.subscribe(galleryData => {
      const uploadImages = galleryData.map(image => {
        image.image_path = environment.staticUrl + '/uploads/' + image.filename;
        return image;
      });
      this.gallery.push(...uploadImages);
      this.model.gallery = this.gallery;

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
