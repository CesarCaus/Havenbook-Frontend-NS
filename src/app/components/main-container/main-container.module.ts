import { NgModule } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { MainContainerComponent } from './main-container.component';
import { ActivitiesComponent } from './activities/activities.component';
import { BooksComponent } from './books/books.component';
import { UsersComponent } from './users/users.component';
import { SalesComponent } from './sales/sales.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { NavigationService } from '../../services/navigation.service';
import { ActivitiesListComponent } from './activities/activities-list/activities-list.component';
import { ActivityManagementComponent } from './activities/activity-management/activity-management.component';
import { ScheduleComponent } from './activities/schedule/schedule.component';
import { ActivityDashboardComponent } from './activities/activity-dashboard/activity-dashboard.component';
import { BoxNewActivityComponent } from './activities/activities-list/box-new-activity/box-new-activity.component';
import { FormsModule } from '@angular/forms';
import { BoxEditActivityComponent } from './activities/activities-list/box-edit-activity/box-edit-activity.component';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { BrowserModule } from '@angular/platform-browser';
import { ListBoxComponent } from './books/list-box/list-box.component';
import { BookViewBoxComponent } from './books/book-view-box/book-view-box.component';
import { UserViewBoxComponent } from './users/user-view-box/user-view-box.component';

@NgModule({
  declarations: [
    MainContainerComponent,
    ActivitiesComponent,
    BooksComponent,
    UsersComponent,
    SalesComponent,
    StatisticsComponent,
    ActivitiesListComponent,
    ActivityManagementComponent,
    ScheduleComponent,
    ActivityDashboardComponent,
    BoxNewActivityComponent,
    BoxEditActivityComponent,
    ClickOutsideDirective,
    ListBoxComponent,
    BookViewBoxComponent,
    UserViewBoxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule
  ],
  providers: [
    NavigationService
  ],
  exports: [
    MainContainerComponent
  ]
})
export class MainContainerModule { }
