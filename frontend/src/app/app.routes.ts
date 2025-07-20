import { Routes } from '@angular/router';
import { EmploiComponent } from './pages/emploi/emploi.component';
import { ClassesComponent } from './pages/classes/classes.component';
import { CoursComponent } from './pages/cours/cours.component';
import { MatieresComponent } from './pages/matieres/matieres.component';
import { SallesComponent } from './pages/salles/salles.component';

export const routes: Routes = [
  { path: '', redirectTo: 'cours', pathMatch: 'full' },
  { path: 'emploi', component: EmploiComponent },
  { path: 'classes', component: ClassesComponent },
  { path: 'cours', component: CoursComponent },
  { path: 'matieres', component: MatieresComponent },
  { path: 'salles', component: SallesComponent }
];

