import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    genero: ['M', [Validators.required]],
    notificaciones: [true, [Validators.required]],
    terminos: [false, [Validators.requiredTrue]]
  })

  persona = {
    genero: 'F',
    notificaciones: true
  }

  ngOnInit(): void {
    this.miFormulario.reset({...this.persona, terminos:true});

    this.miFormulario.valueChanges
    .subscribe( ({terminos, ...rest}) => {
      this.persona = rest;
    })
    
    // this.miFormulario.valueChanges
    //   .subscribe(form => {
    //     console.log(form)
    //     delete form.terminos;
    //     this.persona = form;
    //   })

    // this.miFormulario.get('terminos')?.valueChanges
    // .subscribe(value => {
    //   console.log(value)
    // })
  }

  constructor(private fb:FormBuilder) {}

  guardar() {
    const formValue = {...this.miFormulario.value}
    delete formValue.terminos;
    this.persona = formValue;
  }

}
