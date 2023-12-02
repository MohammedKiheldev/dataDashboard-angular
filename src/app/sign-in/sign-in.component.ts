import { Component, OnInit } from '@angular/core';
import { SignInService } from '../sign-in.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  // Injectez le service Router dans le constructeur
  constructor(private signInService: SignInService, private router: Router) { }

  ngOnInit(): void {
  }

  signIn(): void {
    this.signInService.signIn(this.email, this.password).subscribe(
      (response) => {
        console.log('Sign in successful', response);

        // Sauvegardez l'ID de l'utilisateur en local storage
        localStorage.setItem('userId', response.id);

        console.log('userId', response.id);
        // Redirigez l'utilisateur vers la page de profil
        this.router.navigate(['/profil']);
      },
      (error) => {
        console.error('Sign in failed', error);
        this.errorMessage = error;
        this.router.navigate(['/signin']);
      }
    );
  }
}