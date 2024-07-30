import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IActivity } from '../../../../interfaces/IActivity.interface';
import { ActivitiesService } from '../../../../services/activities.service';
import { CloseBoxService } from '../../../../services/aux-services/close-box.service';
import { BlobOptions } from 'buffer';

@Component({
  selector: 'app-activities-list',
  templateUrl:'./activities-list.component.html',
  styleUrls: ['./activities-list.component.scss']
})
export class ActivitiesListComponent implements OnInit {
  @Output() sendDataActivity = new EventEmitter<IActivity>();
  
  @Input() valueTemplateAddNewActivity = new EventEmitter<boolean>();
  @Input() valueTemplateEditActivity = new EventEmitter<boolean>();

  activities: IActivity[] = [];
  delayedActivities: number = 0;
  templateAddNewActivity: boolean = false;
  templateEditActivity: boolean = false;
  itemActivity!: IActivity;

  handleValueTemplateAddNewActivity(event: boolean) {
   this.templateAddNewActivity = event;
  }

  handleValueTemplateEditActivity(event: boolean) {
    this.templateEditActivity = event;
  }

  constructor(private activitiesService: ActivitiesService) {}

  ngOnInit(): void {
    this.loadActivities();
  }

  loadActivities(): void {
    this.activitiesService.getActivities().subscribe(
      data => {
        this.activities = data;
        this.sortActivitiesByDate();
        this.getDelayedActivities();
      },
      error => {
        console.error('Erro ao carregar atividades', error);
      }
    );
  }

  removeActivity(item: IActivity): void {
    this.activitiesService.deleteActivity(item.id).subscribe(
      () => {
        this.loadActivities();
      },
      error => {
        console.error('Erro ao deletar atividade', error);
      }
    );
  }

  sortActivitiesByDate(): void {
    this.activities.sort((a, b) => {
      const dateA = new Date(a.finalDate).getTime();
      const dateB = new Date(b.finalDate).getTime();
      return dateA - dateB;
    });
  }

  calculateDaysRemaining(date: string): number {
    const currentDate = new Date();
    const targetDate = new Date(date);
    const differenceInMilliseconds = targetDate.getTime() - currentDate.getTime();
    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    if (Math.ceil(differenceInMilliseconds / millisecondsPerDay) === 0) {
      return 1;
    } if (Math.ceil(differenceInMilliseconds / millisecondsPerDay) === -1){
      return -1
    }
    return Math.ceil(differenceInMilliseconds / millisecondsPerDay) + 1;
  }

  getDelayedActivities(): void {
    this.delayedActivities = 0;
    this.activities.forEach(item => {
      const daysRemaining = this.calculateDaysRemaining(item.finalDate);
      if (daysRemaining < 0) {
        this.delayedActivities++;
      }
    });
  }

  openAddNewActivity(): void {
    this.templateAddNewActivity = true;
  }

  openEditActivity(item: IActivity) {
    this.templateEditActivity = true;
    this.itemActivity = item;
    this.sendDataActivity.emit(item);
  }

  sendDataActivityForBox(): IActivity {
    return this.itemActivity;
  }
  
}
