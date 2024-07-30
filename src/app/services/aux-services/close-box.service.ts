import { Injectable } from '@angular/core';
import { BlobOptions } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class CloseBoxService {

  constructor() { }

  actionClose: boolean = false;

  getActionClose() {
    return false;
  }
}
