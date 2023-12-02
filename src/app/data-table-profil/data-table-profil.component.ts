import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-table-profil',
  templateUrl: './data-table-profil.component.html',
  styleUrls: ['./data-table-profil.component.css']
})
export class DataTableProfilComponent implements OnInit {
  fileName: string = '';
  fileContent: string = '';
  errorMessage: string = '';
  fileContentRows: string[][] = [];
  newRows: string[] = [];

  userNameFiles: string[] = [];
  
  // Store deleted rows for undo functionality
  deletedRows: string[][] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // You can initialize the default file name here or let the user specify it in the UI
    // Set the default file name
    this.fileName = 'file.csv';
    

    // Load the content of the default file
    this.loadFileContent();
  }

  loadFileContent(): void {
    // Validation and HTTP request code remain unchanged

    let userId = localStorage.getItem('userId'); // Get the user ID from local storage

    // Use userId as 1 if it's not available in local storage
    userId = userId ? userId : '1';
    this.http.get(`http://localhost:8080/files/${this.fileName}?userId=${userId}`, { responseType: 'text' }).subscribe(
  (response: string) => {
    this.fileContent = response;
    this.fileContentRows = this.fileContent.split('\n').map(row => row.split(','));

    // Remove the last row if it's empty
    if (this.fileContentRows[this.fileContentRows.length - 1].length === 1 && this.fileContentRows[this.fileContentRows.length - 1][0] === '') {
      this.fileContentRows.pop();
    }

    console.log('File Content Rows:', this.fileContentRows);
  },
  (error: any) => {
    this.errorMessage = 'Error loading the file. Check the file name and try again.';
    console.error('Error loading the file:', error);
  }
);

  }

  deleteRow(rowIndex: number): void {
    // Store the deleted row
    const deletedRow = this.fileContentRows.splice(rowIndex, 1)[0];
    
    // Check if deletedRow is defined before pushing it to deletedRows
    if (deletedRow) {
      this.deletedRows.push(deletedRow);
      this.updateFileContent();
    }
  }

  saveToFile(): void {
    // Check if there are any changes to fileContentRows
    if (!this.fileContentRows || this.fileContentRows.length === 0 || this.fileContentRows.some(row => row.length === 0)) {
      console.error('No valid file content available to save.');
      return;
    }
  
    // Convert fileContentRows to CSV format
    const updatedFileContent = this.fileContentRows.map(row => row.join(',')).join('\n');
  
    // Make an HTTP request to update the file content using PUT
    this.http.put(`http://localhost:8080/files/${this.fileName}`, updatedFileContent, { responseType: 'text' }).subscribe(
      (response: string) => {
        console.log('File saved successfully:', response);
      },
      (error: any) => {
        console.error('Error saving the file:', error);
      }
    );
  }

  getUserFiles(): void {
    const userId = localStorage.getItem('userId');

    // Check if userId is available before making the HTTP request
    if (userId) {
      // Make an HTTP request to get the list of files associated with the user
      this.http.get<string[]>(`http://localhost:8080/user/${userId}/files`).subscribe(
        (files: string[]) => {
          this.userNameFiles = files;
        },
        (error: any) => {
          console.error('Error loading user files:', error);
        }
      );
    } else {
      console.error('User ID is not available in local storage.');
    }
  }
  
  

  // Restore the last deleted row
  undoDelete(): void {
    const lastDeletedRow = this.deletedRows.pop();

    // Check if lastDeletedRow is defined before pushing it back to fileContentRows
    if (lastDeletedRow) {
      this.fileContentRows.push(lastDeletedRow);
      this.updateFileContent();
    }
  }

  add(): void {
    // You need to define the logic for adding a new row here.
    // For example, you might add an empty row:
    const newRow: string[] = Array(this.fileContentRows[0].length).fill('');
    this.fileContentRows.push(newRow);
    this.updateFileContent();
  }

  updateFileContent(): void {
    this.fileContent = this.fileContentRows.map(row => row.join(',')).join('\n');
  }

  downloadCSV(): void {
    // Check if there are any changes to fileContentRows
    if (!this.fileContentRows || this.fileContentRows.length === 0 || this.fileContentRows[0].length === 0) {
      console.error('No file content available.');
      return;
    }
  
    // Convert fileContentRows to CSV format
    const updatedFileContent = this.fileContentRows.map(row => row.join(',')).join('\n');
  
    // Create a Blob and initiate the download
    const blob = new Blob([updatedFileContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
  
    // Create a link element and trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.csv';
    document.body.appendChild(link);
    link.click();
  
    // Clean up
    document.body.removeChild(link);
  }

  // Function to add a random row
  addRandomRow(): void {
    const newRow: string[] = this.generateRandomRow();
    this.fileContentRows.push(newRow);
    this.updateFileContent();
  }

  // Function to generate a random row
  private generateRandomRow(): string[] {
    const randomRow: string[] = [];
    
    // Modify the logic based on your requirements
    for (let i = 0; i < this.fileContentRows[0].length; i++) {
      const randomValue = Math.floor(Math.random() * 100).toString();
      randomRow.push(randomValue);
    }

    return randomRow;
  }
  
}
