import { Component } from '@angular/core';
import { ColDef, CellClickedEvent } from 'ag-grid-community';
import { ApiService } from '../../services/api.service';
import { Matiere } from '../../models/matiere';
import { Cours } from '../../models/cours';
import { Classe } from '../../models/classe';
import { Salle } from '../../models/salle';
import { AgGridAngular } from 'ag-grid-angular';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-matieres',
  standalone: true,
  templateUrl: './matieres.component.html',
  styleUrl: './matieres.component.css',
  imports: [
    AgGridAngular,
    NgIf,
    RouterLink
  ],
})
export class MatieresComponent {
  rowData: Matiere[] = [];
  coursFiltered: any[] = [];
  selectedMatiereNom: string | null = null;

  private allCours: Cours[] = [];
  private allClasses: Classe[] = [];
  private allSalles: Salle[] = [];

  colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'nom', headerName: 'Nom de la matière', flex: 1 }
  ];

  coursColDefs: ColDef[] = [
    { field: 'classe', headerName: 'Classe', flex: 1 },
    { field: 'salle', headerName: 'Salle', flex: 1 },
    { field: 'jour', headerName: 'Jour', width: 120 },
    { field: 'heureDebut', headerName: 'Heure Début', width: 150 },
    { field: 'heureFin', headerName: 'Heure Fin', width: 150 },
  ];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getMatieres().subscribe(data => this.rowData = data);
    this.api.getCours().subscribe(data => this.allCours = data);
    this.api.getClasses().subscribe(data => this.allClasses = data);
    this.api.getSalles().subscribe(data => this.allSalles = data);
  }

  onCellClicked(event: CellClickedEvent) {
    const matiere: Matiere = event.data;
    const matiereId = matiere.id;
    this.selectedMatiereNom = matiere.nom;

    const coursForMatiere = this.allCours.filter(c => +c.matiereId === +matiereId);

    this.coursFiltered = coursForMatiere.map(c => {
      const classe = this.allClasses.find(cl => +cl.id === +c.classeId);
      const salle = this.allSalles.find(sl => +sl.id === +c.salleId);

      return {
        classe: classe?.nom ?? `Classe #${c.classeId}`,
        salle: salle?.nom ?? `Salle #${c.salleId}`,
        jour: c.jour,
        heureDebut: c.heureDebut,
        heureFin: c.heureFin
      };
    });
  }
}
