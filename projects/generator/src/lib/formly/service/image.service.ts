import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IImageUpload} from '../interface/upload.interface';
// import {environment} from '../../../../../environments/environment';
const environment = {
    apiUrl: 'http://localhost:4000'
};
@Injectable({
    providedIn: 'root'
})
export class ImageService {

    API_URL = '/v1/api/';
    API_SCRAPE = '/apiscrape';

    constructor(private http: HttpClient) {
    }

    fetchList(): Observable<IImageUpload[]> {

        return this.http.get<IImageUpload[]>(environment.apiUrl + 'images?page=1',);

    }

// [ngClass]="status ? 'selectedImg' : 'unselectedImg'"
    searchImages(imageStr: string): Observable<IImageUpload[]> {
        return this.http.get<IImageUpload[]>(this.API_URL + `images?page=1&s=${imageStr}`);
    }

    saveImages(files: File[]): Observable<any> {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('files', file);
            console.log(file);

        });
        return this.http.post<any>(environment.apiUrl + '/file/upload', formData);
    }

    saveImagesByUrl(image) {
        const files = [];
        files.push({
            file_name: image.file_name || '',
            file_path: image.file_path
        });
        return this.http.post<any>(this.API_URL + 'upload_url', files);
    }


}
