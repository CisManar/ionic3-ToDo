import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Lockr from 'lockr';

@IonicPage()
@Component({
  selector: 'page-category-form',
  templateUrl: 'category-form.html',
})
export class CategoryFormPage {

  categoryForm: FormGroup;
  category: any;
  categories: any[] = [];
  isNew: boolean = true;

  index: number;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fb: FormBuilder) {


    this.index = this.categories.findIndex(i=>i.title == this.category.title);
    //this.index = this.categories.map(function (obj) { return obj.title; }).indexOf(this.category.title);
  

    this.categoryForm = fb.group({

      title: ['', Validators.required]

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryFormPage');
  }

  saveCategory() {
    if (this.isNew) {
      this.category['tasks'] = [];
      console.log(this.category)
     this.categories.push(this.category)

    } else {
      this.categories[this.index].title = this.category.title;

    }
    Lockr.set('categories', this.categories);

    this.navCtrl.pop();
  }
  

}
