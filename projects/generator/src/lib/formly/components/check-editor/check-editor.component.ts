import {Component, Input, OnInit} from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {FieldType} from '@ngx-formly/core';

@Component({
    selector: 'app-check-editor',
    template: `
        <angular-editor id="editor1" [config]="config" [formControl]="formControl" [formlyAttributes]="field"></angular-editor>
    `,
    styles: [`h1 {
        font-family: Lato,serif;
    }`]
})
export class CheckEditorComponent extends FieldType implements OnInit {
    config: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        minHeight: '20rem',
        maxHeight: '20rem',
        height: '400px',
        placeholder: 'Enter text here...',
        translate: 'no',
        sanitize: false,
        toolbarPosition: 'top',
        defaultFontName: 'Arial',
        customClasses: [
            {
                name: 'quote',
                class: 'quote',
            },
            {
                name: 'redText',
                class: 'redText'
            },
            {
                name: 'titleText',
                class: 'titleText',
                tag: 'h1',
            },
        ]
    };
    @Input() name: string;

    ngOnInit(): void {}

}
