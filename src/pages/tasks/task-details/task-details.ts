import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import Lockr from 'lockr';

@IonicPage()
@Component({
  selector: 'page-task-details',
  templateUrl: 'task-details.html',
})
export class TaskDetailsPage {

  task: any = {
    title: '',
    description: '',
    dueDate: '',
    tasktags : []
  };
  categoryTitle: any;

  categoryIndex: number;
  taskIndex: number;

  categories: any[] = [];

  category : any;
  tasks: any[] = [];
  tags : any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController) {

    this.task = navParams.get('Task') ? navParams.get('Task') : this.task;
    this.tags = navParams.get('Task') ? this.task.tasktags : [];
    console.log(this.tags)

    this.category = navParams.get('category');
    this.categoryTitle = this.category.title;

    this.categories = Lockr.get('categories') ? Lockr.get('categories') : [];
    console.log('categories', this.categories);

      //find index of this category
      this.categoryIndex = this.categories.findIndex(i=> JSON.stringify(i) == JSON.stringify(this.category));


      this.taskIndex = this.categories[this.categoryIndex].tasks.findIndex(i => JSON.stringify(i) == JSON.stringify(this.task));



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskDetailsPage');
  }

  confirmDelete(task) {
    let alert = this.alertCtrl.create({
      title: 'Do you want to DELETE this task?',
      message: 'you will be unabled to get it again ! ',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            return;
          }
        },
        {
          text: 'I\'m sure',
          handler: () => {
            this.deleteTask(task)
          }
        }
      ]
    });
    alert.present();
  }

  deleteTask(task) {

    let taskIndex = this.categories[this.categoryIndex].tasks.findIndex((i) => JSON.stringify(i) == JSON.stringify(task));

    let tasksOfCategory = this.categories[this.categoryIndex].tasks;
    let tasks = tasksOfCategory.filter(i => tasksOfCategory.indexOf(i) != taskIndex);

    this.categories[this.categoryIndex].tasks = tasks;

    Lockr.set('categories', this.categories)
    this.navCtrl.pop();



  }

  editTask(Task: any) {
  this.navCtrl.push('TaskFormPage', { category: this.category, Task: Task });
}
}
