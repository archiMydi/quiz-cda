import { NgFor, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-configuration',
  imports: [FormsModule, NgFor, NgForOf],
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent {
  nom: string = '';
  prenom: string = '';
  nombreQuestions: number = 5;
  categorie: string = 'Catégorie 1';
  typeQuestion: string = 'QCM';

  categories: string[] = [
    'Catégorie 1',
    'Catégorie 2',
    'Catégorie 3',
    'Catégorie 4',
    'Catégorie 5',
  ];

  onSubmit() {
    console.log({
      nom: this.nom,
      prenom: this.prenom,
      nombreQuestions: this.nombreQuestions,
      categorie: this.categorie,
      typeQuestion: this.typeQuestion,
    });
  }
}
