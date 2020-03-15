import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public firstName: any;
  public lastName: any;
  public mobile: any;
  public email: any;
  public password: any;
  public apikey: any;

  constructor(
    public appService: AppService,
    public router: Router,
    private toastr: ToastrService,
    vcr: ViewContainerRef
  ) { 


  //  this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  public goToSignIn: any = () => {

    this.router.navigate(['/']);

  }

  public signupFunction: any = () => {
    if(!this.firstName){
      this.toastr.warning('enter first Name')
    }else if(!this.lastName){
      this.toastr.warning('enter last name')
    }else if(!this.mobile){
      this.toastr.warning('enter Mobile')
    }else if(!this.email){
      this.toastr.warning('enter email')
    }else if(!this.password){
      this.toastr.warning('enter password')
    }else if(!this.apikey){
      this.toastr.warning('enter apikey')
    }else {
      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        mobile: this.mobile,
        email: this.email,
        password: this.password,
        apikey: this.apikey
      }

      console.log(data);

      this.appService.signupFunction(data).subscribe((apiResponse) => {
        console.log(apiResponse);

        if (apiResponse.status === 200){
          this.toastr.success('signup successful');
          setTimeout(() => {
            this.goToSignIn();
          }, 2000);

        }else{
          this.toastr.error(apiResponse.message);
        }
      }, (err) => {
          this.toastr.error('some error occured');
      });
    }



  }

}
