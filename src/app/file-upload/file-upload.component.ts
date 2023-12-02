import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  selectedFile: File | undefined;

  constructor(private httpClient: HttpClient) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onFileChanged(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.selectedFile = fileList[0];
    }
  }

  onUpload() {
    if (!this.selectedFile) {
      console.error('No file selected.');
      return;
    }
  
    const userId = localStorage.getItem('userId'); // Get the user ID from local storage
  
    if (!userId) {
      console.error('User ID is not available.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', this.selectedFile);
  
    this.httpClient.post('http://localhost:8080/files/upload?userId=' + userId, formData, { responseType: 'text' })
      .subscribe(
        (response: any) => {
          console.log('File uploaded successfully:', response);

          // Affichez une alerte à l'utilisateur
        alert('File uploaded successfully.');
        // Ajoutez ici la logique de redirection ou de gestion des succès
  
          // Handle the response as needed
        },
        (error: any) => {
          console.error('Error uploading file:', error);
        }
      );
  }
  
  
}
