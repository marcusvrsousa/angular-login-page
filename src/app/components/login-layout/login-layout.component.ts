import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-login-layout',
  imports: [],
  templateUrl: './login-layout.component.html',
  styleUrl: './login-layout.component.scss'
})
export class LoginLayoutComponent {

  @Input() title:string = ""
  @Input() primaryButtonText:string = ""
  @Input() secondaryButtonText:string = ""

}
