import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IActivity } from '../../../../../interfaces/IActivity.interface';
import { ActivitiesService } from '../../../../../services/activities.service';
import { ActivitiesListComponent } from '../activities-list.component';

@Component({
  selector: 'app-box-edit-activity',
  templateUrl: './box-edit-activity.component.html',
  styleUrls: ['./box-edit-activity.component.scss']
})
export class BoxEditActivityComponent implements OnInit {

  @Output() valueTemplateEditActivity = new EventEmitter<boolean>();
  @Input() valueActivity!: IActivity;

  description!: string;
  finalDate!: String;

  constructor(private activityService: ActivitiesService, 
              private activitiesList: ActivitiesListComponent) {}
  
  ngOnInit(): void {
    if (this.valueActivity) {
      this.description = this.valueActivity.description;
      this.finalDate = new Date(this.valueActivity.finalDate).toISOString().substr(0, 10);
    }
  }

  closeBox(): void {
    this.valueTemplateEditActivity.emit(false);
  }

  updateActivity() {
    const activity: IActivity = {
      id: this.valueActivity.id,
      description: this.description,
      responsableId: this.valueActivity.responsableId,
      finalDate: this.finalDate.toString()
    }

    console.log(activity)

    this.activityService.updateActivity(activity).subscribe(
      () => {
        this.activitiesList.loadActivities();
      },
      error => {
        console.error('Erro ao atualizar atividade', error);
      }
    )

    this.closeBox()
  }
}
