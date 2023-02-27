import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  public nombreApellidoPattern  : string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern           : string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor() { }

  noPuedeSerStrider(control: FormControl): ValidationErrors | null {
    // console.log(control.value);
    const valor:string = control.value?.trim().toLowerCase();
    
    if (valor === 'strider'){
      return {
        noStrider: true
      }
    } 

    return null;
  }

  camposIguales(campoUno: string, campoDos: string) {

    return (formGroup: AbstractControl) : ValidationErrors | null => {
      
      console.log(formGroup);

      const passUno = formGroup.get(campoUno)?.value;
      const passDos = formGroup.get(campoDos)?.value;

      if (passUno !== passDos) {
        formGroup.get(campoDos)?.setErrors({noIguales: true})
        return { noIguales: true };
      }

      formGroup.get(campoDos)?.setErrors(null);
      
      return null
    }
  }
}
