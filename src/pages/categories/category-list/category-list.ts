import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import Lockr from 'lockr';

@IonicPage()
@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html',
})
export class CategoryListPage {

  categories : any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl : AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryListPage');
  }
  ionViewDidEnter() {
    this.categories = Lockr.get('categories') ? Lockr.get('categories') : [];
  }

  addCategory() {
    this.navCtrl.push('CategoryFormPage')
  }
  editCategory(category) {
    this.navCtrl.push('CategoryFormPage',{ category : category})
  }
  categoryTasks(category) {
    this.navCtrl.push('TaskListPage' , {category: category})
  }
  confirmDelete(category) {
    let alert = this.alertCtrl.create({
      title: 'Do you want to DELETE this Category?',
      message: 'deleting category will delete all tasks that belong to it ! ',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            return;
          }
        },
        {
          text: "I'm sure",
          handler: () => {
            this.deleteCategory(category)
          }
        }
      ]
    });
    alert.present();
  }

  deleteCategory(category) {

    let index = this.categories.indexOf(category);


    this.categories = this.categories.filter((item, i) => i != index);


    Lockr.set('categories', this.categories);
  }

}
