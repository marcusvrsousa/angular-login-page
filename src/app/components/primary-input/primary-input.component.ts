import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

type InputTypes = "text" | "email" | "password"
@Component({
  selector: 'app-primary-input',
  imports: [ReactiveFormsModule],
  
  templateUrl: './primary-input.component.html',
  styleUrl: './primary-input.component.scss'
})
export class PrimaryInputComponent {
  @Input() control!: FormControl;
  @Input() type: InputTypes = "text"
  // @Input() formName: string = ""
  @Input() placeholder: string = ""
  @Input() label: string = ""
  @Input() inputName: string = ""
}
