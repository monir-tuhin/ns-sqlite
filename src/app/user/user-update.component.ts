import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import {User} from "../model/user.model";
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'ns-user-update',
  moduleId: module.id,
  templateUrl: './user-update.component.html',
  styleUrls: ['./user.component.css'],

})
export class UserUpdateComponent implements OnInit {
    public user: User;
    public userList = [];
    item: any;
    selectedId: any;

  constructor(private databaseService: DatabaseService, private router: RouterExtensions, private route: ActivatedRoute) {
      this.user = {
          name: '',
          email: ''
      }
   }

   ngOnInit() {
    this.getAllUser();
    const id: any = +this.route.snapshot.params.id;
    console.log('id :', id);
    this.item = this.getSelectedUser(id);
  }

  public getAllUser() {
    this.databaseService.selectAll().then((res: any) => {
        console.log(res);
        this.userList = res;
        })
  }

  public getSelectedUser(id) {
    this.databaseService.selectSingle(id).then((res: any) => {
        // console.log('ggggggggggg', res);
        this.item = res[0];
        console.log(this.item);
        this.user.name = this.item.name;
        this.user.email = this.item.email;
        this.selectedId = this.item.id;

        })
  }



  public updateUser() {
      console.log(this.user);
    if(this.user.name !== '' && this.user.email !== '') {
        this.databaseService.update(this.user, this.selectedId).then(res => {
            console.log(res);
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
