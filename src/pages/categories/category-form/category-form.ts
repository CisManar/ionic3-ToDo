import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../../../app/Category.mode';
import Lockr from 'lockr';

@IonicPage()
@Component({
  selector: 'page-category-form',
  templateUrl: 'category-form.html',
})
export class CategoryFormPage {

  categoryForm: FormGroup;
  category: Category = new Category();
  categories: Category[] = [];
  isNew: boolean = true;

  index: number;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fb: FormBuilder) {


    this.category = navParams.get('category') ? navParams.get('category') : {};
    this.isNew = navParams.get('category') ? !this.isNew : this.isNew;

    this.categories = Lockr.get('categories');

    this.index = this.categories.map(function (obj) { return obj.title; }).indexOf(this.category.title);

    this.categoryForm = fb.group({

      title: ['', Validators.required]

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryFormPage');
  }

  saveCategory() {
    if (this.isNew) {

      this.categories.push(this.category);

    } else {

      this.categories[this.index].title = this.category.title;

    }
    Lockr.set('categories', this.categories);
  }

}
