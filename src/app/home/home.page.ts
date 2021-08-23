import { Component } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';
import { UserlistPage } from '../userlist/userlist.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public AddData: FormGroup;
  submitform = false;
  constructor(public formbuilder: FormBuilder, public router: Router) {
    // , Validators.pattern['/^(\+d{1,3}[-]?)?\d{10}$/'], Validators.minLength(10), Validators.maxLength(10)
  }
  ngOnInit() {
    // window.localStorage.setItem("userdata", "")
    this.AddData = this.formbuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    })
  }
  submit() {
    this.submitform = true;
    if (this.AddData.valid) {
      if (this.AddData.value.name && this.AddData.value.name.trim()) {
        var userlist: any = window.localStorage.getItem("userdata")
        if (userlist) {
          var userdata = JSON.parse(userlist)
          console.log(userdata)
          var filter = userdata.filter(item => item.email == this.AddData.value.email)
          if (filter && filter.length > 0) {
            alert("Email already added")
          }
          else {
            var dataform = {
              name: this.AddData.value.name,
              email: this.AddData.value.email,
              mobile: this.AddData.value.mobile,
            }
            userdata.push(dataform)
            window.localStorage.setItem("userdata", JSON.stringify(userdata))
            alert("User add Successful !")
            this.AddData.reset()
            this.router.navigate(["userlist"])
          }
        }
        else {
          var dataform = {
            name: this.AddData.value.name,
            email: this.AddData.value.email,
            mobile: this.AddData.value.mobile,
          }
          var data = [];
          data.push(dataform)
          window.localStorage.setItem("userdata", JSON.stringify(data))
          alert("User add Successful !")
          this.AddData.reset()
          this.router.navigate(["userlist"])

        }
      }
      else {
        alert("please enter name")
      }

    }
  }
  get f() {
    return this.AddData.controls;
  }
  listuser() {
    this.router.navigate(["userlist"])
  }
}
