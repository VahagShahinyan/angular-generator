import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormlyModule} from '@ngx-formly/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { AngularEditorModule } from '@kolkov/angular-editor';
import {FileValueAccessor} from './components/file-value-accessor';
import {FileTypeComponent} from './components/file-type.component';
import {CheckEditorComponent} from './components/check-editor/check-editor.component';
import {ModalComponent} from './components/modal/modal.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {MatDialogModule} from '@angular/material/dialog';
import { OneImageComponent } from './components/one-image/one-image.component';
import { GalleryImagesComponent } from './components/gallery-images/gallery-images.component';

@NgModule({
  declarations: [ FileValueAccessor, FileTypeComponent, CheckEditorComponent, ModalComponent, OneImageComponent, GalleryImagesComponent],
  imports: [
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot({
      validationMessages: [{name: 'required', message: 'This field is required'}],
      types: [
        {name: 'file', component: FileTypeComponent, wrappers: ['form-field']},
        {name: 'checkEditor', component: CheckEditorComponent},
        {name: 'oneImage', component: OneImageComponent},
        {name: 'gallery', component: GalleryImagesComponent}
      ],
    }),
    EditorModule,
    CommonModule,
    HttpClientModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyMaterialModule,
    FormsModule,
    AngularEditorModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    NgxDropzoneModule,
    MatDialogModule
  ],
  exports: [ FileValueAccessor, FileTypeComponent, CheckEditorComponent, ModalComponent, OneImageComponent, GalleryImagesComponent],

})
export class FormlySharedModule { }
