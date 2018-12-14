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
  category: any = {
    title: ''
  };
  categories: any[] = [];
  isNew: boolean = true;
  index:number ;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fb: FormBuilder) {

    this.category = navParams.get('category') ? navParams.get('category') : {};
    this.categories = Lockr.get('categories') ? Lockr.get('categories') : [];
    this.isNew = navParams.get('category') ? false : true;


    this.index = this.categories.findIndex(i=> JSON.stringify(i) == JSON.stringify(this.category));

    this.categoryForm = fb.group({

      title: ['', Validators.required]

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryFormPage');
  }

  saveCategory() {

    if (this.categoryForm.invalid) {
      return;
    }

    if (this.isNew) {
      this.category['tasks'] = [];
      this.categories.push(this.category);

    } else {

      this.categories[this.index].title = this.category.title;
    }
    Lockr.set('categories', this.categories);

    this.navCtrl.pop();
  }


}
