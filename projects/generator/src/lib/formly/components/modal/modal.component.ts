import {Component, ElementRef, EventEmitter, HostListener, Inject, OnInit, Output, ViewChild} from '@angular/core';
import {ImageService} from '../../service/image.service';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {IImageUpload} from '../../interface/upload.interface';

export interface SelectedImages {
    id: number;
    imagePath: string;
    imageAlt: string;
}

export enum ModalTab {
    upload,
    gallery,
    collage,
    image_parser,
    crop
}

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit {


    files: File[] = [];
    images: IImageUpload[] = [];
    imageStr = '';
    @ViewChild('searchStr', {static: true}) searchStr: ElementRef;
    status = false;
    selectedImages: SelectedImages[] = [];
    @ViewChild('dropzoneComponent', {static: true}) dropzoneContainer;
    @Output() OnImages = new EventEmitter<any[]>();
    modalActiveTab: ModalTab = ModalTab.upload;


    // openModal() {
    //     this.OnOpenModal.emit(this.dialog.open(ModalComponent, {height: '470', width: '70%'}))
    //     // const dialogRef = this.dialog.open(ModalComponent, {height: '470', width: '70%'});
    //     // console.log(dialogRef);
    // }
    description: string;
    // modalSelector: string = '#modal_image_upload';
    // selector: string='.uploadGallery';
    multiple = true;
    youtubeLink = '';
    youtubeImageUrl = '';

    constructor(
        private imageService: ImageService,
        private dialog: MatDialog,
        private dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) data
    ) {
        this.multiple = data.multiple;
    }

    onSelect(event) {
        if (!this.multiple && this.files.length > 0) {
            this.files = [];
        }
        this.files.push(...event.addedFiles);
    }

    onRemove(event) {
        this.files.splice(this.files.indexOf(event), 1);
    }

    ngOnInit(): void {}

    uploadImages() {
        switch (this.modalActiveTab) {
            case ModalTab.upload:
                this.imageService.saveImages(this.files).subscribe(uploadFiles => this.OnImages.emit(uploadFiles));
                break;
            case ModalTab.gallery:
                this.listPhotos();
                break;
            case ModalTab.collage:
                break;
            case ModalTab.image_parser:
                this.imageService.saveImagesByUrl({
                    file_name: '',
                    file_path: this.youtubeImageUrl
                }).subscribe(uploadFiles => this.OnImages.emit(uploadFiles));
                break;
            case ModalTab.crop:
                break;
            default:
                this.imageService.saveImages(this.files).subscribe(uploadFiles => this.OnImages.emit(uploadFiles));
                break;
        }


    }


    pastImages() {
        this.OnImages.emit(this.selectedImages);
    }

    changeTab($event: MatTabChangeEvent) {
        switch ($event.index) {
            case ModalTab.upload:
                console.log('ModalTab.upload', ModalTab.upload);
                this.modalActiveTab = ModalTab.upload;
                break;
            case ModalTab.gallery:
                this.modalActiveTab = ModalTab.gallery;
                this.listPhotos();
                break;
            case ModalTab.collage:
                this.modalActiveTab = ModalTab.collage;
                break;
            case ModalTab.image_parser:
                console.log('ModalTab.image_parser', ModalTab.image_parser);
                this.modalActiveTab = ModalTab.image_parser;
                break;
            case ModalTab.crop:
                this.modalActiveTab = ModalTab.crop;
                break;
            default:
                this.modalActiveTab = ModalTab.upload;
                break;
        }

    }

    listPhotos() {
        this.imageService.fetchList().subscribe((result: IImageUpload[]) => {
            this.images = result;
        });
    }

    search($event: KeyboardEvent) {
        this.imageService.searchImages(this.searchStr.nativeElement.value).subscribe((result: IImageUpload[]) => {
            this.images = result;
        });
    }

    @HostListener('window:scroll', ['$event'])

    onScroll($event: Event) {
        // this.scrollHeight - this.scrollTop - this.clientHeight <= 500
        console.log('----e---', $event);
    }

    onSelectGalleryImg($event, id: number, imagePath: string, imageAlt: string) {
        const obj: SelectedImages = {id, imagePath, imageAlt};
        if ($event.classList.contains('selectedImg')) {
            $event.classList.remove('selectedImg');
            // $event.classList.add('unselectedImg');
            delete this.selectedImages[this.selectedImages.indexOf(obj)];
        } else {
            // if ($event.classList.contains('unselectedImg')){
            //     $event.classList.remove('unselectedImg');
            // }
            $event.classList.add('selectedImg');
            this.selectedImages.push(obj);
        }

        console.log(' this.selectedImages', this.selectedImages);
    }

    youtubeLinkFunc() {
        let youtubeVideoId = '';
        if (this.youtubeLink.includes('https://youtu.be')) {
            youtubeVideoId = this.youtubeLink.trim().slice(17, 28);
        } else if (this.youtubeLink.includes('https://www.youtube.com/watch?v=')) {
            youtubeVideoId = this.youtubeLink.trim().slice(32, 43);
        }
        if (youtubeVideoId) {
            this.youtubeImageUrl = `https://i.ytimg.com/vi/${youtubeVideoId}/maxresdefault.jpg`;
        }


    }
}
