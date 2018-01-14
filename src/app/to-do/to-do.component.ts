import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import * as firebase  from 'firebase/app';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TaskService } from '../services/task.service';
import { TaskComponent } from '../task/task.component';

import { ToDo, Priorities } from '../../shared/to-do-list';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit {

  user: firebase.User = null;
  todoForm : FormGroup;
  toDos: ToDo[] =[];
  toDo: ToDo = {
    id: 0,
    message: '',
    timestamp: '',
    priorty: '',
    status: 'Un-Done'
  };
  priorites = Priorities;

  todoError = {
    'message': '',
    'priorty': ''
  }

  errors = {
    'message': {
      'required' : 'Task is required'
    }
  };

  constructor(private authService: AuthService, 
              private router : Router,
              private fb : FormBuilder,
              public taskService: TaskService
              ) {
    this.createForm();
    this.todoForm.valueChanges.subscribe((data) => this.onValueChange(data));
    this.onValueChange();
    this.user = this.authService.getUser();
    if(!this.user){
      this.router.navigate(['/login']);
    }

    this.taskService.getToDos().subscribe((data) => {this.toDos = data;}
                              , (err) => {console.log(err)});
  }

  ngOnInit() {
  }

  createForm(){
    this.todoForm = this.fb.group({
      message: ['', [Validators.required]],
      priorty: ['Low']
    });
  }

  onValueChange(data?: any){
    if(!this.todoForm){
      return;
    }
    const form = this.todoForm;
    for(const field in this.todoError){
      const control = form.get(field);
      this.todoError[field] = '';
      if(control && control.dirty && !control.valid){
        const message = this.errors[field];
        for(const key in control.errors){
          this.todoError[field] += message[key] + ' ';
        }
      }
    }
  }

  onSubmit(){
    this.toDo.id = this.toDos.length > 0 ? Math.max(...this.toDos.map((todo) => {return todo.id})) + 1 : 1;
    this.toDo.timestamp = (new Date()).toDateString();
    this.toDo.message = this.todoForm.get('message').value;
    this.toDo.priorty = this.todoForm.get('priorty').value;
    this.toDo.status = 'Un-Done';
    //this.toDos.push(this.toDo);
    this.taskService.addToDo(this.toDo);
    
    this.toDo = {
      id: 0,
      message: '',
      timestamp: '',
      priorty: '',
      status: 'Un-Done'
    };
    this.todoForm.reset({
      message: '',
      priorty: 'Low'
    });
  }

  logout(){
    this.authService.logout();
  }

  
}
