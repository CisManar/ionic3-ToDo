import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TaskListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task-list',
  templateUrl: 'task-list.html',
})
export class TaskListPage {

  categoryTitle : any ;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.categoryTitle = navParams.get('categoryTitle');

    console.log(this.categoryTitle)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskListPage');
  }

}
