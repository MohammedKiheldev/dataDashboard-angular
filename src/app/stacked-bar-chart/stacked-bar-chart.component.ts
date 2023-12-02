import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js/auto'; // Mettez à jour cette ligne

Chart.register(...registerables); // Ajoutez cette ligne

@Component({
  selector: 'app-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrls: ['./stacked-bar-chart.component.css']
})
export class StackedBarChartComponent implements OnInit {
  fileName: string = '';
  fileContent: string = '';
  errorMessage: string = '';
  chart!: Chart;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Set the default file name
    this.fileName = 'file.csv';

    // Load the content of the default file
    this.loadFileContent();
  }

  loadFileContent(): void {
    // Validation du formulaire
    if (this.fileName.trim() === '') {
      this.errorMessage = 'Veuillez entrer un nom de fichier.';
      return;
    }

    // Réinitialiser le message d'erreur
    this.errorMessage = '';
    let userId = localStorage.getItem('userId'); // Get the user ID from local storage

    // Use userId as 1 if it's not available in local storage
    userId = userId ? userId : '1';
    this.http.get(`http://localhost:8080/files/${this.fileName}?userId=${userId}`, { responseType: 'text' }).subscribe(
      (response: string) => {
        // Traitez la réponse et affectez le contenu du fichier à la propriété
        this.fileContent = response;

        // Affichez le contenu du fichier dans la console pour déboguer (vous pouvez le retirer dans la version finale)
        console.log('Contenu du fichier :', this.fileContent);

        // Créez le graphique à barres empilées
        this.createStackedBarChart();
      },
      (error: any) => {
        // Gestion des erreurs côté utilisateur
        this.errorMessage = 'Erreur lors du chargement du fichier. Vérifiez le nom du fichier et réessayez.';
        console.error('Erreur lors du chargement du fichier :', error);
      }
    );
  }

  createStackedBarChart(): void {
    const parsedData = this.parseFileContent(this.fileContent);

    const ctx = document.getElementById('stackedBarChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: parsedData.labels,
        datasets: parsedData.datasets,
      },
      options: {
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      },
    });
  }

  parseFileContent(content: string): { labels: string[], datasets: any[] } {
    const lines = content.split('\n');
  
    // Extract labels from the first line (assuming the first element is the category)
    const labels = lines[0].split(',');
  
    // Initialize datasets array
    const datasets = [];
  
    // Loop through lines starting from the second line
    for (let i = 1; i < lines.length; i++) {
      const data = lines[i].split(',');
  
      // Create a dataset for each line
      const dataset = {
        label: data[0], // Assuming the first element is the category/product name
        data: data.slice(1).map(Number),
      };
  
      datasets.push(dataset);
    }
  
    return { labels, datasets };
  }
  
}
