import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskFormPage } from './task-form';
import {IonTagsInputModule} from "ionic-tags-input";

@NgModule({
  declarations: [
    TaskFormPage,
  ],
  imports: [
    IonTagsInputModule,
    IonicPageModule.forChild(TaskFormPage),
  ],
})
export class TaskFormPageModule {}
