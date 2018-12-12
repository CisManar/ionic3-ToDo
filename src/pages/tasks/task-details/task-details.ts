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
    dueDate: ''
  };
  categoryTitle: any;

  categoryIndex: number;
  taskIndex: number;

  categories: any[] = [];

  tasks: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController) {

    this.task = navParams.get('Task') ? navParams.get('Task') : this.task;
    this.categoryTitle = navParams.get('categoryTitle');

    this.categories = Lockr.get('categories') ? Lockr.get('categories') : [];
    console.log('categories', this.categories);

    this.categoryIndex = this.categories.findIndex(i => i.title == this.categoryTitle);

    this.taskIndex = this.categories[this.categoryIndex].tasks.findIndex(i => i.title == this.task.title);

    this.tasks = this.categories[this.categoryIndex].tasks;


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

    this.tasks = this.tasks.filter(x=>x.title != task.title)
    this.categories[this.categoryIndex].tasks = this.tasks;

    Lockr.set('categories', this.categories)



    Lockr.set('categories', this.categories)

    this.navCtrl.pop();



  }

  editTask(Task: any) {
 //   this.navCtrl.pop();
    this.navCtrl.push('TaskFormPage', { categoryTitle: this.categoryTitle, Task: Task });
  }
}
