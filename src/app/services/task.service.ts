import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToDo } from '../../shared/to-do-list';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class TaskService {
  private todos: ToDo[] = [];
  private id_key: string[]= [];

  item : FirebaseListObservable<any[]>;

  private toDosShared = new BehaviorSubject<ToDo[]>(this.todos);
  constructor( public afauth: AngularFireAuth, public afdatabase : AngularFireDatabase) {
    this.afauth.authState.subscribe((auth) => {
      if(auth){
        //console.log(auth);
        this.item = this.afdatabase.list('/'+auth.uid+'/tasks', {
          query : {
            limitToLast: 50
          }
        });
        this.item.subscribe((item) => {
          //console.log(item);
          this.todos = item.map((todo) => {
            this.id_key[todo.id] = todo.$key;
            return {
            id : todo.id,
            message: todo.message,
            timestamp: todo.timestamp,
            status: todo.status,
            priorty: todo.priorty
          }});
          //console.log(this.id_key);
          this.toDosShared.next(this.todos);
        });
      }
    });
   }

  getToDos() : Observable<ToDo[]>{
    return this.toDosShared.asObservable();
  }
  
  addToDo(todo: ToDo){
    this.item.push(todo);
    //console.log(this.toDos);
  }

  removeToDo(ids: number[]){
    //console.log(ids);
    for(let i in ids){
      //console.log(ids[i]);
      this.item.remove(this.id_key[ids[i]]);
    }
  }

  changeStatus(ids: number[], status: string){
    this.todos.map((todo) => {
      if(ids.indexOf(todo.id) >= 0){
        todo.status = status;
        this.item.update(this.id_key[todo.id], todo);
      }
      //console.log(this.toDos);
    });
  }
}
