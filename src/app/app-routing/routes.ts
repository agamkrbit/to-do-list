import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { ToDoComponent } from '../to-do/to-do.component';


export const routes : Routes = [
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'to-do', component: ToDoComponent
    },
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    }
];
