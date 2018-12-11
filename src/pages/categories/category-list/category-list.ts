import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import Lockr from 'lockr';
import { Category } from '../../../app/Category.mode';

@IonicPage()
@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html',
})
export class CategoryListPage {

  categories : Category[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryListPage');
    this.categories = Lockr.get('categories');
  }

  addCategory() {
    this.navCtrl.push('CategoryFormPage')
  }
  editCategory(category) {
    this.navCtrl.push('CategoryFormPage',{ category : category})
  }
  categoryTasks(categoryTitle) {
    this.navCtrl.push('TaskListPage' , {categoryTitle: categoryTitle})
  }
}
