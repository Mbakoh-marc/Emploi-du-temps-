import { Component } from '@angular/core';
import { ColDef, CellClickedEvent } from 'ag-grid-community';
import { ApiService } from '../../services/api.service';
import { Salle } from '../../models/salle';
import { Cours } from '../../models/cours';
import { Classe } from '../../models/classe';
import { Matiere } from '../../models/matiere';
import { AgGridAngular } from 'ag-grid-angular';
import {RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-salles',
  standalone: true,
  templateUrl: './salles.component.html',
  styleUrl: './salles.component.css',
  imports: [
    AgGridAngular,
    RouterLink,
    NgIf
  ],
})
export class SallesComponent {
  rowData: Salle[] = [];
  coursFiltered: any[] = [];
  selectedSalleId: number | null = null;
  selectedSalleNom: string = '';

  private allCours: Cours[] = [];
  private allClasses: Classe[] = [];
  private allMatieres: Matiere[] = [];

  colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'nom', headerName: 'Nom de la salle', flex: 1 }
  ];

  coursColDefs: ColDef[] = [
    { field: 'classe', headerName: 'Classe', flex: 1 },
    { field: 'matiere', headerName: 'Matière', flex: 1 },
    { field: 'jour', headerName: 'Jour', width: 120 },
    { field: 'heureDebut', headerName: 'Heure Début', width: 150 },
    { field: 'heureFin', headerName: 'Heure Fin', width: 150 },
  ];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getSalles().subscribe(data => this.rowData = data);
    this.api.getCours().subscribe(data => this.allCours = data);
    this.api.getClasses().subscribe(data => this.allClasses = data);
    this.api.getMatieres().subscribe(data => this.allMatieres = data);
  }

  onCellClicked(event: CellClickedEvent) {
    const salle: Salle = event.data;
    this.selectedSalleId = salle.id ?? null;
    this.selectedSalleNom = salle.nom;

    const coursForSalle = this.allCours.filter(c => +c.salleId === +this.selectedSalleId!);

    this.coursFiltered = coursForSalle.map(c => {
      const classe = this.allClasses.find(cl => +cl.id === +c.classeId);
      const matiere = this.allMatieres.find(m => +m.id === +c.matiereId);

      return {
        classe: classe?.nom ?? `Classe #${c.classeId}`,
        matiere: matiere?.nom ?? `Matière #${c.matiereId}`,
        jour: c.jour,
        heureDebut: c.heureDebut,
        heureFin: c.heureFin
      };
    });
  }
}
