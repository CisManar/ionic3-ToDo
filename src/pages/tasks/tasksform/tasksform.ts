import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Lockr from 'lockr';

@IonicPage()
@Component({
  selector: 'page-tasksform',
  templateUrl: 'tasksform.html',
})
export class TasksformPage {

  categories: any[] = [];

  taskIndex: number;
  categoryIndex: number;
  category: any;
  categoryTitle: string;
  taskForm: FormGroup;
  isNew: boolean = true;
  task: any = {
    title: '',
    description: '',
    dueDate: '',
    tasktags: []
  };
  tags = [];
  pageTitle = "";


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formbuilder: FormBuilder,
    public events: Events) {

      this.categories = Lockr.get('categories')

    this.category = navParams.get('category');
    this.categoryIndex = navParams.get('categoryIndex');

    this.task = navParams.get('Task') ? navParams.get('Task') : this.task;

    this.tags = this.task.tasktags ? this.task.tasktags : [];
    this.category.tasktags = this.tags

    this.isNew = this.task.title ? false : true;

    this.pageTitle = this.isNew ? "Add New Task" : "Edit Task";

    this.taskForm = formbuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      tasktags: []
    })

   this.taskIndex =navParams.get('Task') ? this.categories[this.categoryIndex].tasks.findIndex((i) => JSON.stringify(i) == JSON.stringify(this.task)) : this.taskIndex;

    //  this.taskIndex = this.categories[this.categoryIndex].tasks.findIndex(i => JSON.stringify(i) == JSON.stringify(this.task));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TasksformPage');
  }
  onChange(val) {
    console.log(this.tags)
  }
  save() {

    this.task.tasktags = this.tags;


    if (this.taskForm.invalid) {
      return
    }
    this.categories = Lockr.get('categories')
    this.isNew ?
      this.categories[this.categoryIndex].tasks.push(this.task) :
      this.categories[this.categoryIndex].tasks[this.taskIndex] = this.task;

    Lockr.set('categories', this.categories)
    console.log('index',this.categoryIndex)
    //here
    let category = this.categories[this.categoryIndex]
    this.events.publish('getTasks', category);


    this.navCtrl.pop();

  }
}
