import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Persona {
  nombre: string;
  favoritos: Favorito[];
}

interface Favorito {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  nuevoJuego:string = '';

  persona: Persona = {
    nombre: 'Esteban',
    favoritos: [
      {id: 1, nombre: 'Metal Gear'},
      {id: 2, nombre: 'DeathStranding'}
    ]
  }
  
  @ViewChild('miFormulario') miFormulario!: NgForm;

  nombreValido():boolean {
    // El ? indica si lo tenemos entonces...
    return this.miFormulario?.controls['nombre']?.invalid && 
    this.miFormulario?.controls['nombre']?.touched
  }

  guardar() {
    console.log(this.miFormulario);
  }

  eliminar(i: number) {
    this.persona.favoritos.splice(i, 1);
  }

  agregarJuego() {
    const nuevoFavorito: Favorito = {
      id: this.persona.favoritos.length +1,
      nombre: this.nuevoJuego
    }

    this.persona.favoritos.push({...nuevoFavorito});
    this.nuevoJuego = '';
  }
}
