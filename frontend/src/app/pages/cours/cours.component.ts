import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Cours } from '../../models/cours';
import { Classe } from '../../models/classe';
import { Matiere } from '../../models/matiere';
import { Salle } from '../../models/salle';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { AgGridModule } from 'ag-grid-angular';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AgGridModule,
    //RouterLinkActive,
    RouterLink
  ],
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {
  coursList: Cours[] = [];
  classes: Classe[] = [];
  matieres: Matiere[] = [];
  salles: Salle[] = [];
  jours: string[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  formData: Cours = {
    classeId: 0,
    matiereId: 0,
    salleId: 0,
    jour: '',
    heureDebut: '',
    heureFin: ''
  };

  editingId: number | null = null;
  isLoaded = false;

  columnDefs = [
    { headerName: 'Classe', field: 'classeNom' },
    { headerName: 'Matière', field: 'matiereNom' },
    { headerName: 'Salle', field: 'salleNom' },
    { headerName: 'Jour', field: 'jour' },
    { headerName: 'Début', field: 'heureDebut' },
    { headerName: 'Fin', field: 'heureFin' },
    {
      headerName: 'Actions',
      field: 'actions',
      width: 250,
      cellRenderer: (params: any) => {
        return `
          <button class="btn btn-sm btn-warning edit-btn">Modifier</button>
          <button class="btn btn-sm btn-danger delete-btn">Supprimer</button>
        `;
      }
    }
  ];

  rowData: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.isLoaded = false;
    forkJoin({
      cours: this.api.getCours(),
      classes: this.api.getClasses(),
      matieres: this.api.getMatieres(),
      salles: this.api.getSalles()
    }).subscribe(result => {
      this.classes = result.classes;
      this.matieres = result.matieres;
      this.salles = result.salles;

      // Convertir IDs en number ici pour les cours
      this.coursList = result.cours.map(c => ({
        ...c,
        classeId: Number(c.classeId),
        matiereId: Number(c.matiereId),
        salleId: Number(c.salleId)
      }));

      this.rowData = this.coursList.map(c => ({
        ...c,
        classeNom: this.getClasseNom(c.classeId),
        matiereNom: this.getMatiereNom(c.matiereId),
        salleNom: this.getSalleNom(c.salleId)
      }));

      this.isLoaded = true;
    });
  }

  onGridReady(params: any): void {
    params.api.sizeColumnsToFit();

    // Ajout écouteur sur click pour les boutons
    params.api.addEventListener('cellClicked', (event: any) => {
      if (event.event.target.classList.contains('edit-btn')) {
        this.edit(event.data);
      }
      if (event.event.target.classList.contains('delete-btn')) {
        this.delete(event.data.id);
      }
    });
  }

  submit(): void {
    if (this.editingId) {
      this.api.updateCours(this.editingId, this.formData).subscribe(() => {
        this.loadAll();
        this.reset();
      });
    } else {
      this.api.addCours(this.formData).subscribe(() => {
        this.loadAll();
        this.reset();
      });
    }
  }

  edit(cours: Cours): void {
    this.formData = { ...cours };
    this.editingId = cours.id ?? null;
  }

  delete(id: number | undefined): void {
    if (!id) return;
    this.api.deleteCours(id).subscribe(() => {
      this.loadAll();
    });
  }

  reset(): void {
    this.formData = {
      classeId: 0,
      matiereId: 0,
      salleId: 0,
      jour: '',
      heureDebut: '',
      heureFin: ''
    };
    this.editingId = null;
  }

  getClasseNom(id: number): string {
    const classe = this.classes.find(c => c.id === id);
    return classe ? classe.nom : '';
  }

  getMatiereNom(id: number): string {
    const matiere = this.matieres.find(m => m.id === id);
    return matiere ? matiere.nom : '';
  }

  getSalleNom(id: number): string {
    const salle = this.salles.find(s => s.id === id);
    return salle ? salle.nom : '';
  }
}
