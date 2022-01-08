import {Component, OnInit} from '@angular/core';
import {ModalComponent} from '../modal/modal.component';
// import {environment} from '../../../../../../environments/environment';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {FieldType} from '@ngx-formly/core';
const environment = {
    apiUrl: 'http://localhost:4000'
};

interface IImage {
    image_path: string;
    image_id: number;

}

@Component({
    selector: 'app-one-image',
    templateUrl: './one-image.component.html',
    styleUrls: ['./one-image.component.scss']
})
export class OneImageComponent extends FieldType  {
    imagePath: string;


    dialogConfig = new MatDialogConfig();
    image: IImage = {
        image_path: null,
        image_id: null
    };

    constructor(public dialog: MatDialog) {
        super();
        this.dialogConfig.disableClose = false;
        this.dialogConfig.autoFocus = true;
        this.dialogConfig.data = {multiple: false};
        this.dialogConfig.height = '470';
        this.dialogConfig.width = '70%';

    }

    imageModal() {
        this.dialogConfig.data = {multiple: false};
        const dialogRef = this.dialog.open(ModalComponent, this.dialogConfig);
        dialogRef.componentInstance.OnImages.subscribe(([modalData]) => {
            const image = {
                image_id: modalData.id,
                image_path: environment.staticUrl + '/uploads/' + modalData.filename
            };
            this.field.model.image = image;
            this.image = image;

        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });


    }

    onRemoveCurrentImage() {
        this.field.model.image = null;
        this.image = null;
    }

}
