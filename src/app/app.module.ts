import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { StackedBarChartComponent } from './stacked-bar-chart/stacked-bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { DataTableComponent } from './data-table/data-table.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { LineGraphsComponent } from './line-graphs/line-graphs.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfilComponent } from './profil/profil.component';
import { StackedBarChartProfilComponent } from './stacked-bar-chart-profil/stacked-bar-chart-profil.component';
import { PieChartProfilComponent } from './pie-chart-profil/pie-chart-profil.component';
import { LineGraphsProfilComponent } from './line-graphs-profil/line-graphs-profil.component';
import { DataTableProfilComponent } from './data-table-profil/data-table-profil.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    SignInComponent,
    SignUpComponent,
    StackedBarChartComponent,
    PieChartComponent,
    DataTableComponent,
    FileUploadComponent,
    LineGraphsComponent,
    ProfilComponent,
    StackedBarChartProfilComponent,
    PieChartProfilComponent,
    LineGraphsProfilComponent,
    DataTableProfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
