import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { nombreApellidoPattern, emailPattern, noPuedeSerStrider } from '../../../shared/validator/validaciones';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})

export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group ({
    nombre: ['', [Validators.required, Validators.pattern(this.vs.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.vs.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, this.vs.noPuedeSerStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  },
  {
    validators: [this.vs.camposIguales('password', 'password2')]
  })

  // emailErrorMsg: string = '';

  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email');
    if(errors?.hasError('required')){
      return 'Email es obligatorio.'
    }
    else if (errors?.hasError('pattern')){
      return 'El formato de email es incorrecto.'
    }
    else if (errors?.hasError('emailTomado')){
      return 'El email ya fue tomado.'
    }

    return '';
    
  }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Esteban Calixto',
      email: 'test1@test.com',
      username: 'ShirouK7',
      password: '123456',
      password2: '123456'
    })
  }

  constructor (private fb: FormBuilder, 
    private vs: ValidatorService,
    private emailValidator: EmailValidatorService
    ) { }

  campoNoValido(campo:string) {
    return this.miFormulario.get(campo)?.invalid
      && this.miFormulario.get(campo)?.touched;
  }

  // emailRequired () {
  //   return this.miFormulario.get('email')?.touched
  //   && this.miFormulario.get('email')?.hasError('required');
  // }

  // emailFormat () {
  //   return this.miFormulario.get('email')?.touched
  //   && this.miFormulario.get('email')?.hasError('pattern');
  // }

  // emailTomado() {
  //   return this.miFormulario.get('email')?.touched
  //   && this.miFormulario.get('email')?.hasError('emailTomado');
  // }

  submitFormulario() {
    console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched();
  }

}
