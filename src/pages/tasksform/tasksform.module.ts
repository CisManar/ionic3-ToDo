import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TasksformPage } from './tasksform';
import {IonTagsInputModule} from "ionic-tags-input";

@NgModule({
  declarations: [
    TasksformPage,
  ],
  imports: [
    IonTagsInputModule,
    IonicPageModule.forChild(TasksformPage),
  ],
  exports: [
    TasksformPage,
  ]
})
export class TasksformPageModule {}
