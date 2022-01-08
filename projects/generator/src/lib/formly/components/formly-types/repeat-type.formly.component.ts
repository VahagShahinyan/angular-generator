import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-repeat-section',
  template: `
    <div *ngFor="let field of field.fieldGroup; let i = index;" class="row">
      <div class="col-11">
        <formly-field class="row" [field]="field"></formly-field>
      </div>
      <div class="col-1">
        <div class="col-sm-2 d-flex align-items-right">
          <button mat-icon-button color="warn" type="button" (click)="remove(i)" matTooltip="Delete product">
            <mat-icon>delete</mat-icon>
          </button>
        </div>
      </div>
    </div>
    <div style="margin:30px 0;">
      <button class="btn btn-primary" type="button" (click)="add()">{{ to.addText }}</button>
    </div>
  `,
})
export class RepeatTypeComponent extends FieldArrayType {}
