import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import Lockr from 'lockr';


@IonicPage()
@Component({
  selector: 'page-task-list',
  templateUrl: 'task-list.html',
})
export class TaskListPage {

  categoryTitle: any;

  categories: any[] = [];
  tasks: any[] = [];

  categoryIndex: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private events: Events,
    private alertCtrl : AlertController) {



    this.categoryTitle = navParams.get('categoryTitle');

    this.categories = Lockr.get('categories') ? Lockr.get('categories') : [];

    //find index of this category 
    this.categoryIndex = this.categories.findIndex(i => i.title == this.categoryTitle);

    // get tasks aray with this category
    this.tasks = this.categories[this.categoryIndex].tasks;

    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskListPage');
  }
  ionViewDidEnter() {
    this.categories = Lockr.get('categories');
    this.tasks = this.categories[this.categoryIndex].tasks;
  }
  addTask() {
    this.navCtrl.pop();
    this.navCtrl.push('TaskFormPage', { categoryTitle: this.categoryTitle });

  }
  editTask(Task: any) {
   // this.navCtrl.pop();
    this.navCtrl.push('TaskFormPage', { categoryTitle: this.categoryTitle, Task: Task });
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
    this.tasks = this.tasks.filter(x=>x.title != task.title)
    this.categories[this.categoryIndex].tasks = this.tasks;
   
    Lockr.set('categories', this.categories)

  }

  viewTaskDetails(Task) {
    this.navCtrl.pop();
    this.navCtrl.push('TaskDetailsPage' , {categoryTitle: this.categoryTitle, Task: Task})

  }
}
