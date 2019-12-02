import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import {User} from "../model/user.model";
import { RouterExtensions } from 'nativescript-angular/router';


@Component({
  selector: 'ns-user',
  moduleId: module.id,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],

})
export class UserComponent implements OnInit {
  public user: User;

  constructor(private databaseService: DatabaseService, private router: RouterExtensions) {
      this.user = {
          name: '',
          email: ''
      }
   }

  ngOnInit() {}

  public saveUser() {
      console.log(this.user);
    if(this.user.name !== '' && this.user.email !== '') {
        this.databaseService.insert(this.user).then(res => {
            console.log(this.user);
            this.router.navigate(['/userlist'], {clearHistory: true});
        })
    } else {
        alert("Fields are not valid");
    }
 }

 public cancel() {
     this.router.navigate(['/userlist'], {clearHistory: true});
 }


}
