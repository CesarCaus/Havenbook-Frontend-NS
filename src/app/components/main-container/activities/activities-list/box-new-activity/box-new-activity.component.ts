import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { IActivity } from '../../../../../interfaces/IActivity.interface';
import { ActivitiesService } from '../../../../../services/activities.service';
import { ActivitiesListComponent } from '../activities-list.component';
import { CloseBoxService } from '../../../../../services/aux-services/close-box.service';

@Component({
  selector: 'app-box-new-activity',
  templateUrl: './box-new-activity.component.html',
  styleUrls: ['./box-new-activity.component.scss']
})
export class BoxNewActivityComponent {

  @Output() toggleEvent = new EventEmitter<boolean>();
  private value: boolean = true;

  description!: string;
  finalDate!: Date; 
  newActivity!: IActivity;

  constructor(private activityService: ActivitiesService,
             private activitiesList: ActivitiesListComponent, 
             private closeBoxService: CloseBoxService) {}

  @Output() valueTemplateAddNewActivity = new EventEmitter<boolean>();

  closeBox(): void {
    this.valueTemplateAddNewActivity.emit(false);
  }

  addActivity() {
    const date = new Date(this.finalDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adiciona 1 ao mês, pois getMonth() retorna 0-11
    const day = date.getDate().toString().padStart(2, '0'); // Adiciona zero à esquerda, se necessário

    const formattedDate = `${year}-${month}-${day}`;

    this.newActivity = {
      id: 0,
      description: this.description,
      responsableId: 1,
      finalDate: formattedDate
    }

    this.activityService.setActivity(this.newActivity).subscribe(
      () => {
        this.activitiesList.loadActivities();
        this.closeBox();
      },
      error => {
        console.error('Erro ao deletar atividade', error);
      }
    )
  }
}
