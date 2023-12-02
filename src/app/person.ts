// person.model.ts
export class Person {
    id: number;
    name: string;
    email: string;
    password: string;
    sexe: string;
    // Ajoutez d'autres propriétés si nécessaire
  
    constructor(id: number, name: string, email: string, password: string, sexe: string) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.password = password;
      this.sexe = sexe;
    }
  }
  