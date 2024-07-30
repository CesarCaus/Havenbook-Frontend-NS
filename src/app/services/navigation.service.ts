import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private activeComponentSubject: BehaviorSubject<string>;
  public activeComponent$: Observable<string>;

  constructor() {
    this.activeComponentSubject = new BehaviorSubject<string>('books'); // Define o componente inicial ativo
    this.activeComponent$ = this.activeComponentSubject.asObservable();
  }

  setActiveComponent(componentName: string) {
    this.activeComponentSubject.next(componentName);
  }

  getActiveComponent(): Observable<string> {
    return this.activeComponent$;
  }
}
