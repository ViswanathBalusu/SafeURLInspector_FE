import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  api_error: boolean = false
  inputParameter: string = '';
  joutput: any = null;
  ssl_pull_error: string = "";
  isLoading = false; // Add this variable
  constructor(private apiService: ApiService) {}

  submitForm() {
    this.isLoading = true; // Show loading symbol when submitting
    const requestData = {
      uuid: '4f3bd817-5ea8-461c-832e-768ffa399a6b',
      text: this.inputParameter,
    };

    this.apiService.postData(requestData).subscribe(
      (response) => {
        this.joutput = response;
        this.isLoading = false;
        if(this.joutput.ssl_cert.SSLPullError){
          this.ssl_pull_error = this.joutput.ssl_cert.SSLPullError
        }
        else{
          this.ssl_pull_error = "No Error"
        }
        // You can now work with the response data here.
      },
      (error) => {
        this.isLoading = false;
        this.api_error = true;
      }
    );
  }

}
