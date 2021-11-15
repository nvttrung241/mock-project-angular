import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterInfoCustomerService } from './register-info-customer.service';

@Component({
  selector: 'app-register-info-customer',
  templateUrl: './register-info-customer.component.html',
  styleUrls: ['./register-info-customer.component.css']
})
export class RegisterInfoCustomerComponent implements OnInit {
  @Output() infoRegisterSuccess = new EventEmitter<Object>();
  imageFile: any;
  numberRegEx = /^0+[0-9]{9}$/;

  constructor(
    private registerInfoCustomerService: RegisterInfoCustomerService,
    ) { }

  ngOnInit(): void {
  }
  
  registerInfoCustomerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.pattern(this.numberRegEx)]),
    imgSrc: new FormControl(''),
  });

  onImageChange(e) {
    let reader = new FileReader();
    this.registerInfoCustomerForm.patchValue({
      imgSrc: e.target.files[0]
    });
    this.imageFile = e.target.files;
    if(e.target.files && e.target.files.length) {
      let [file] = e.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.imageFile = reader.result as string;
      };
    }
  }

  register(): void {
    let formData = new FormData();
    formData.append('Name', this.registerInfoCustomerForm.get('name').value);
    formData.append('PhoneNumber', this.registerInfoCustomerForm.get('phoneNumber').value);
    formData.append('Avatar', this.registerInfoCustomerForm.get('imgSrc').value);
    this.registerInfoCustomerService.onRegister(formData).subscribe(
      (res) => {
        if(res.isSuccess){
          let infoCustomer = {
            'customerName': this.registerInfoCustomerForm.get('name').value,
            'customerId': res.customerId,
          }
          this.infoRegisterSuccess.emit(infoCustomer);
        }else {
          alert(res.errorMessage);
        }
      },
      (err) => {
        alert(err.errors.title);
      } 
    );
  }
}
