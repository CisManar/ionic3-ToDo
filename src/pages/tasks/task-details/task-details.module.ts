import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskDetailsPage } from './task-details';
import {IonTagsInputModule} from "ionic-tags-input";

@NgModule({
  declarations: [
    TaskDetailsPage,
  ],
  imports: [
    IonTagsInputModule,
    IonicPageModule.forChild(TaskDetailsPage),
  ],
})
export class TaskDetailsPageModule {}
