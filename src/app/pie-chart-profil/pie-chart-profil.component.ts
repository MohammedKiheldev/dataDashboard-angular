import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables, ChartConfiguration, ChartDataset } from 'chart.js/auto';

Chart.register(...registerables);

@Component({
  selector: 'app-pie-chart-profil',
  templateUrl: './pie-chart-profil.component.html',
  styleUrls: ['./pie-chart-profil.component.css']
})
export class PieChartProfilComponent implements OnInit {
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
        this.createPieChart();
      },
      (error: any) => {
        this.errorMessage = 'EError loading the file. Check the file name and try again.';
        console.error('Erreur lors du chargement du fichier :', error);
      }
    );
  }

  createPieChart(): void {
    const parsedData = this.parseFileContent(this.fileContent);

    const data: ChartConfiguration['data'] = {
      labels: parsedData.labels,
      datasets: [
        {
          data: parsedData.datasets[0].data,
          backgroundColor: parsedData.datasets[0].backgroundColor,
          borderWidth: 1
        }
      ]
    };

    const config: ChartConfiguration = {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    };

    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, config);
  }

  parseFileContent(content: string): { labels: string[]; datasets: any[] } {
    const lines = content.split('\n');
  
    // Extract labels from the first line
    const labels = lines[0].split(',');

    // Initialize datasets array
    const datasets = [{
      data: [] as number[], // Use `as number[]` to explicitly set the type to an array of numbers
      backgroundColor: [] as string[] // Use `as string[]` to explicitly set the type to an array of strings
    }];

    // Get data from the second line
    const data = lines[1].split(',');

    // Assuming the first element is the category/product name
    for (let i = 1; i < data.length; i++) {
      datasets[0].data.push(Number(data[i]));
      datasets[0].backgroundColor.push(this.getRandomColor());
    }

    return { labels, datasets };
  }

  getRandomColor(): string {
    // Generate a random color in hexadecimal format
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  }
}
