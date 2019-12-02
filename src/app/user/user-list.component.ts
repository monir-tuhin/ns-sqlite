import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import {User} from "../model/user.model";
import {RouterExtensions} from "nativescript-angular/router";

@Component({
  selector: 'ns-user-list',
  moduleId: module.id,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user.component.css'],

})
export class UserListComponent implements OnInit {
    public users = [];

    constructor(private databaseService: DatabaseService, private router: RouterExtensions) { }

    ngOnInit() {
        this.getAllUser();
    }

    public getAllUser() {
        this.databaseService.selectAll().then((res: any) => {
            console.log(res);
            this.users = res;
        })
    }

  public deleteUser(val) {
      console.log(val);
      this.databaseService.delete(val.id).then(res => {
    //   console.log("User deleted successfully!", res)
      this.getAllUser();
    })
 }

//  public edit(val) {
//     // console.log(val);
//     this.router.navigate(["/singleuser", val.id]);
//  }

   public addUser() {
        this.router.navigate(['/user'], {clearHistory: true});
   }

}
