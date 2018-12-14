import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskslistPage } from './taskslist';

@NgModule({
  declarations: [
    TaskslistPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskslistPage),
  ],
  exports: [
    TaskslistPage,
  ]
})
export class TaskslistPageModule {}
