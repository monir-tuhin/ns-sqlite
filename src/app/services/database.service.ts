import {Injectable} from "@angular/core";
import {User} from "../model/user.model";
var Sqlite = require("nativescript-sqlite");

@Injectable()
export class DatabaseService {

    private createDB() {
        return new Promise((resolve, reject) => {
            return (new Sqlite ("user.db")).then(db => {
                db.execSQL("CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)").then( id => {
                    resolve(db);
                }, error => {
                    console.log("Create Table Error: ", error);
                    reject(error);
                });
            }, error => {
                reject(error);
            })
        })
    }

    public insert(user: User) {
        return new Promise ((resolve, reject) => {
            this.createDB().then((res: any) => {
                res.execSQL("INSERT INTO user (name, email) VALUES (?,?)", [user.name, user.email]).then(id => {
                    console.log("Insert Result: ", id);
                    resolve(true);
                }, error => {
                    console.log("Insert Failed: ", error);
                    reject(false);
                })
            })
        })
    }

    public selectSingle(id) {
        return new Promise ((resolve, reject) => {
            this.createDB().then((res: any) => {
                return res.all("SELECT * FROM user WHERE id=?", id).then(rows => {
                    let result:any [] = [];
                    for(let row in rows) {
                        result.push({
                            "id": rows[row][0],
                            "name": rows[row][1],
                            "email": rows[row][2],
                        });
                    }
                    resolve(result);
                }, error => {
                    console.log("Selected Failed :", error);
                    reject(error);
                })
            })
        })
    }

    public selectAll() {
        return new Promise ((resolve, reject) => {
            this.createDB().then((res: any) => {
                return res.all("SELECT * FROM user").then(rows => {
                    let result:any [] = [];
                    for(let row in rows) {
                        result.push({
                            "id": rows[row][0],
                            "name": rows[row][1],
                            "email": rows[row][2],
                        });
                    }
                    resolve(result);
                }, error => {
                    console.log("Select Error: ", error);
                    reject(error);
                })
            })
        })
    }

    public update(user, selectedId) {
        console.log('dddddddddddsdfsd', selectedId);
        return new Promise ((resolve, reject) => {
            this.createDB().then((res: any) => {
                res.execSQL("UPDATE user SET name = ?, email = ? WHERE id=?", [user.name, user.email, selectedId]).then(id => {
                    console.log("Update Result: ", id);
                    resolve(true);
                }, error => {
                    console.log("Update Failed: ", error);
                    reject(false);
                })
            })
        })
    }

    public delete(id) {
        // console.log(id);
        return new Promise ((resolve, reject) => {
            this.createDB().then((res: any) => {
                return res.execSQL("DELETE FROM user WHERE id=?", id).then(id => {
                    console.log("Item Deleted: ", id);
                    resolve(true);
                }, error => {
                    console.log("Delete Failed :", error);
                    reject(false);
                })
            })
        })
    }

}
