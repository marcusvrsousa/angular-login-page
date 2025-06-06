import { Component } from '@angular/core';
import { LoginLayoutComponent } from '../../components/login-layout/login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
interface LoginForm {
  email: FormControl,
  password: FormControl,
}

@Component({
  selector: 'app-login',
  imports: [
    LoginLayoutComponent, 
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [ LoginService ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  loginForm!: FormGroup<LoginForm>;
  
  constructor(private router: Router, private loginService: LoginService, private toast: ToastrService){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  get emailControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  handleSubmit() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: () => this.toast.success("Login feito com sucesso"),
        error: () => this.toast.error("Erro inesperado. Tente novamente mais tarde!")
      })
    
    } else {
      console.log('Form is invalid');
      this.loginForm.markAllAsTouched(); // mostra erros de validação
    }
  }

  handleNavigate(){
    this.router.navigate(['signup']);
  }
}
