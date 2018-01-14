import { Component, OnInit, Input } from '@angular/core';
import { ToDo , PrioritiesColor, status } from '../../shared/to-do-list';
import { TaskService } from '../services/task.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input()
  toDos: ToDo[];

  prioritiesColor = PrioritiesColor;
  taskStatus = status;
  constructor(public taskService : TaskService) { }

  ngOnInit() {
  }

  statusChange(todos : any, status: string){
    todos = todos.map((select) => { return select.value});
    this.taskService.changeStatus(todos, status);
  }

  delete(todos: any){
    todos = todos.map((select) => { return select.value});
    this.taskService.removeToDo(todos);
  }

  filterDone(todos:ToDo[]){
    return todos.filter((todo) => {return todo.status == 'Done'});
  }

  filterUnDone(todos:ToDo[]){
    return todos.filter((todo) => {return todo.status == 'Un-Done'});
  }
}
