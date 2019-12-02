import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { UserComponent } from "./user/user.component";
import { UserListComponent } from "./user/user-list.component";
import { UserUpdateComponent } from "./user/user-update.component";


const routes: Routes = [
    { path: "", redirectTo: "/userlist", pathMatch: "full" },
    { path: "user", component: UserComponent },
    { path: "userlist", component: UserListComponent },
    { path: "singleuser/:id", component: UserUpdateComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})

export class AppRoutingModule { }
