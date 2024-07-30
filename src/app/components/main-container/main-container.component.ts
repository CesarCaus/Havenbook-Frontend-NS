import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit {
  activeComponent: string = "";

  constructor(private navigationService: NavigationService) {}

  ngOnInit() {
    this.navigationService.getActiveComponent().subscribe(componentName => {
      this.activeComponent = componentName;
    });
  }
}
