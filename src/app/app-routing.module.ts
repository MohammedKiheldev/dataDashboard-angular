import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { StackedBarChartComponent } from './stacked-bar-chart/stacked-bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { DataTableComponent } from './data-table/data-table.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { LineGraphsComponent } from './line-graphs/line-graphs.component';
import { ProfilComponent } from './profil/profil.component';
import { DataTableProfilComponent } from './data-table-profil/data-table-profil.component';
import { LineGraphsProfilComponent } from './line-graphs-profil/line-graphs-profil.component';
import { StackedBarChartProfilComponent } from './stacked-bar-chart-profil/stacked-bar-chart-profil.component';
import { PieChartProfilComponent } from './pie-chart-profil/pie-chart-profil.component';

const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'stackedbarchart', component: StackedBarChartComponent },
  { path: 'piechart', component: PieChartComponent },
  { path: 'datatable', component: DataTableComponent },
  { path: 'stackedbarchartprofil', component: StackedBarChartProfilComponent },
  { path: 'piechartprofil', component: PieChartProfilComponent },
  { path: 'linegraphsprofil', component: LineGraphsProfilComponent },
  { path: 'datatableprofil', component: DataTableProfilComponent },
  { path: 'fileupload', component: FileUploadComponent },
  { path: 'linegraphs', component: LineGraphsComponent },
  { path: '', redirectTo: '/index', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
