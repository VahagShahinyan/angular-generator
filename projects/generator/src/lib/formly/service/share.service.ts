import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
interface IImage{
  image_path: string | null;
  image_id: number | string |null;
}

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  private messageSource = new BehaviorSubject<IImage>({image_path: null , image_id: null });
  currentMessage = this.messageSource.asObservable();
  constructor() { }

  shareImage(image: IImage): void {
    this.messageSource.next(image);
  }
}
