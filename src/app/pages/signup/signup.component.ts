import { Component } from '@angular/core';
import { LoginLayoutComponent } from '../../components/login-layout/login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

interface SignupForm {
  name: FormControl,
  email: FormControl,
  password: FormControl,
  passwordConfirm: FormControl
}

@Component({
  selector: 'app-signup',
  imports: [
    LoginLayoutComponent, 
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [ LoginService ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})


export class SingupComponent {
  
  signupForm!: FormGroup<SignupForm>;
  
  constructor(private router: Router, private loginService: LoginService, private toast: ToastrService){
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  get nameControl(): FormControl {
    return this.signupForm.get('name') as FormControl;
  }
  
  get emailControl(): FormControl {
    return this.signupForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.signupForm.get('password') as FormControl;
  }

  get passwordConfirmControl(): FormControl {
    return this.signupForm.get('passwordConfirm') as FormControl;
  }

  handleSubmit() {
    if (this.signupForm.valid) {
      this.loginService.login(this.signupForm.value.email, this.signupForm.value.password).subscribe({
        next: () => this.toast.success("Login feito com sucesso"),
        error: () => this.toast.error("Erro inesperado. Tente novamente mais tarde!")
      })
    
    } else {
      console.log('Form is invalid');
      this.signupForm.markAllAsTouched(); // mostra erros de validação
    }
  }

  handleNavigate(){
    this.router.navigate(['login']);
  }
}
