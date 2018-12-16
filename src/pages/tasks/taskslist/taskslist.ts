import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import Lockr from 'lockr';

@IonicPage()
@Component({
  selector: 'page-taskslist',
  templateUrl: 'taskslist.html',
})
export class TaskslistPage {

  categories: any[] = [];
  category: any;
  tasks: any[] = [];
  task: any;
  categoryIndex: number;
  categoryTitle: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public events : Events,
    private alertCtrl : AlertController) {

      

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskslistPage');

    this.category = this.navParams.get('category');
      this.categoryTitle = this.category.title;
      this.categories = Lockr.get('categories') ? Lockr.get('categories') : [] ;


      this.categoryIndex = this.categories.findIndex(i =>
        JSON.stringify(i) == JSON.stringify(this.category)
      );
      this.tasks = this.categories[this.categoryIndex].tasks;

    this.events.subscribe('getTasks',(category) => {
      console.log(category)
      this.tasks = category.tasks;
      console.log(this.tasks)
    })
  }

  ionViewWillEnter() {

    

  }

  addTask() {
    this.navCtrl.push('TasksformPage', { category: this.category , categoryIndex : this.categoryIndex});
  }
  editTask(Task: any) {
    this.navCtrl.push('TasksformPage', { category: this.category, categoryIndex : this.categoryIndex, Task: Task });

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
   //         this.events.publish('getTasks',this.categoryIndex);

          }
        }
      ]
    });
    alert.present();
  }

  deleteTask(task) {


    let taskIndex = this.categories[this.categoryIndex].tasks.findIndex((i) => JSON.stringify(i) == JSON.stringify(task));

    let tasks = this.categories[this.categoryIndex].tasks;

    tasks = tasks.filter(i => tasks.indexOf(i) != taskIndex);

    this.categories[this.categoryIndex].tasks = tasks;

    Lockr.set('categories', this.categories);

    let category = this.categories[this.categoryIndex];

    this.events.publish('getTasks', category);
  }
  viewTaskDetails(Task) {

    this.navCtrl.push('TaskDetailsPage' , {category: this.category, Task: Task})

  }
}
