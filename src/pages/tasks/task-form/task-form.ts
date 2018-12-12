import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Alert } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Lockr from 'lockr';


@IonicPage()
@Component({
  selector: 'page-task-form',
  templateUrl: 'task-form.html',
})
export class TaskFormPage {

  categoryTitle: any;
  taskForm: FormGroup;
  tasks: any[] = [];
  categories: any[] = [];
  isNew: boolean = true;

  task: any = {
    title: '',
    description: '',
    dueDate: ''
  };

  categoryIndex: number;
  taskIndex: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formbuilder: FormBuilder,
    private events: Events) {


    this.task = navParams.get('Task') ? navParams.get('Task') : this.task;
    this.isNew =  this.task.title ? false : true;

    this.categoryTitle = navParams.get('categoryTitle');

    this.categories = Lockr.get('categories') ? Lockr.get('categories') : [];

    //find index of this category
    this.categoryIndex = this.categories.findIndex(i => i.title == this.categoryTitle);

    // get tasks aray with this category
    this.tasks = this.categories[this.categoryIndex].tasks;

    //find index of this task
    this.taskIndex = this.tasks.findIndex(i => i.title == this.task.title);



    this.taskForm = formbuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required]
    })



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskFormPage');



  }

  save() {
    if(this.taskForm.invalid) {
      return
    }
    this.isNew ?
      this.categories[this.categoryIndex].tasks.push(this.task) :
      this.categories[this.categoryIndex].tasks[this.taskIndex] = this.task;

    Lockr.set('categories', this.categories)

    this.navCtrl.pop();




  }


}
