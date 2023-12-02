// sign-up.component.ts
import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { SignupService } from '../signup.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  person: Person = new Person(0, '', '', '', ''); // Initialisez avec des valeurs par défaut
  confirmPassword: String = "";

  constructor(private signupService: SignupService, private router: Router) {}

  ngOnInit(): void {}

  signUp(): void {
    this.signupService.savePerson(this.person).subscribe(
      (response) => {
        console.log('Person created successfully', response);
        // Ajoutez ici la logique de redirection ou de gestion des succès

        // Affichez une alerte à l'utilisateur
        alert('Sign up successful! You can now log in.');
        // Ajoutez ici la logique de redirection ou de gestion des succès
        this.router.navigate(['/signin']);
      },
      (error) => {
        console.error('Error creating person', error);
        // Ajoutez ici la logique de gestion des erreurs
      }
    );
  }
}
