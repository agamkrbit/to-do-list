import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
    this.authService.getAuthState().subscribe(auth => {
      if(auth){
        this.router.navigateByUrl('/to-do');
      }
    },
      err => {
        console.log(err);
      });
   }

  ngOnInit() {
  }

  loginWithGoogle(){
    this.authService.googlelogin()
      .then((success) => {
        this.router.navigate(['/to-do']);
      })
      .catch((err) => {
      console.log(err);
      });
  }

}
