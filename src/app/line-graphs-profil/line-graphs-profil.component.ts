// Importations nécessaires
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables, ChartConfiguration } from 'chart.js/auto';

// Enregistrement des modules Chart.js nécessaires
Chart.register(...registerables);

@Component({
  selector: 'app-line-graphs-profil',
  templateUrl: './line-graphs-profil.component.html',
  styleUrls: ['./line-graphs-profil.component.css']
})
export class LineGraphsProfilComponent implements OnInit {
  fileName: string = '';
  fileContent: string = '';
  errorMessage: string = '';
  chart!: Chart;

  constructor(private http: HttpClient) { }

  ngOnInit(): void { 
    // Set the default file name
    this.fileName = 'file.csv';

    // Load the content of the default file
    this.loadFileContent();
  }

  loadFileContent(): void {
    if (this.fileName.trim() === '') {
      this.errorMessage = '';
      return;
    }

    this.errorMessage = '';
    const userId = localStorage.getItem('userId'); // Get the user ID from local storage

   
    this.http.get(`http://localhost:8080/files/${this.fileName}?userId=${userId}`, { responseType: 'text' }).subscribe(
      (response: string) => {
        this.fileContent = response;
        console.log('Contenu du fichier :', this.fileContent);
        this.createLineGraph();
      },
      (error: any) => {
        this.errorMessage = 'Error loading the file. Check the file name and try again.';
        console.error('Erreur lors du chargement du fichier :', error);
      }
    );
  }

  createLineGraph(): void {
    const parsedData = this.parseFileContent(this.fileContent);

    const data: ChartConfiguration['data'] = {
      labels: parsedData.labels,
      datasets: parsedData.datasets.map(dataset => ({
        label: dataset.label,
        data: dataset.data,
        borderColor: this.getRandomColor(),
        borderWidth: 1,
        fill: false
      }))
    };

    const config: ChartConfiguration = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    };

    const ctx = document.getElementById('lineGraph') as HTMLCanvasElement;
    this.chart = new Chart(ctx, config);
  }

  parseFileContent(content: string): { labels: string[]; datasets: any[] } {
    const lines = content.split('\n');

    // Extract labels from the first line
    const labels = lines[0].split(',');

    // Initialize datasets array
    const datasets = lines.slice(1).map(line => {
      const data = line.split(',');
      return {
        label: data[0],
        data: data.slice(1).map(Number)
      };
    });

    return { labels, datasets };
  }

  getRandomColor(): string {
    // Generate a random color in hexadecimal format
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  }
}
