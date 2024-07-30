import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {
  activeComponent: string = "actitivies";

  constructor(private navigationService: NavigationService) {}

  ngOnInit() {
    this.navigationService.getActiveComponent().subscribe(componentName => {
      this.activeComponent = componentName;
    });
  }

  setActiveComponent(componentName: string) {
    this.navigationService.setActiveComponent(componentName);
  }
}
