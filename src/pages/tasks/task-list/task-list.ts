import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import Lockr from 'lockr';


@IonicPage()
@Component({
  selector: 'page-task-list',
  templateUrl: 'task-list.html',
})
export class TaskListPage {


  categories: any[] = [];
  tasks: any[] = [];

  categoryIndex: number;
  category:any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private events: Events,
    private alertCtrl : AlertController) {

      this.category = navParams.get('category');
      this.categories = Lockr.get('categories') ? Lockr.get('categories') : [];
      //index of category
      this.categoryIndex = this.categories.findIndex(i=> JSON.stringify(i) == JSON.stringify(this.category));
      this.tasks = this.categories[this.categoryIndex].tasks?this.categories[this.categoryIndex].tasks:[];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskListPage');
  }
  ionViewDidEnter() {
    this.categories = Lockr.get('categories') ?  Lockr.get('categories'): [];
    console.log("category::::",this.category)
  }
  addTask() {
    this.navCtrl.push('TaskFormPage', { category: this.category });

  }
  editTask(Task: any) {
   // this.navCtrl.pop();
   this.navCtrl.push('TaskFormPage', { category: this.category, Task: Task });

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
  }

  viewTaskDetails(Task) {

    this.navCtrl.push('TaskDetailsPage' , {category: this.category, Task: Task})

  }
}
