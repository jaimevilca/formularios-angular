import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent implements OnInit {

  forma: FormGroup;


  usuario: Object = {
    nombreCompleto: {
      nombre: 'jaime',
      apellido: 'andres'
    },
    correo: 'jaime@test.com',
    pasatiempos: []
  }

  constructor() {
    this.forma = new FormGroup({
      'nombreCompleto': new FormGroup({
        'nombre': new FormControl('', [Validators.required, Validators.minLength(3), this.noJaime]),
        'apellido': new FormControl('', Validators.required),
      }),

      'correo': new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      'pasatiempos': new FormArray([
        new FormControl('correr', Validators.required)
      ]),
      'username': new FormControl('', Validators.required, this.existeUsuario),
      'password1': new FormControl('', Validators.required),
      'password2': new FormControl()
    });


    this.forma.controls['password2'].setValidators([
      Validators.required, this.noIgual.bind(this.forma)
    ]);


    // this.forma.valueChanges.subscribe( data => {
    this.forma.controls["username"].valueChanges
      .subscribe(data => {
        console.log(data);
      });


    this.forma.controls["username"].statusChanges
      .subscribe(data => {
        console.log(data);
      });



    // this.forma.setValue(this.usuario);
  }

  ngOnInit() {
  }

  guardarCambios() {
    console.log(this.forma);
    // this.forma.reset({
    //     nombreCompleto: {
    //         nombre: '',
    //         apellido: ''
    //       },
    //       correo: ''
    // });
  }


  agregarPasatiempo() {
    (<FormArray>this.forma.controls['pasatiempos']).push(new FormControl('', Validators.required));
  }


  noJaime(control: FormControl): { [s: string]: boolean } {

    if (control.value == 'jaime') {
      return {
        nojaime: true
      }
    }

    return null;

  }


  existeUsuario(control: FormControl): Promise<any> | Observable<any> {

    let promesa = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value == 'strider') {
          resolve({ existe: true })
        } else {
          resolve(null);
        }
      }, 1000);
    });

    return promesa;

  }



  noIgual(control: FormControl): { [s: string]: boolean } {

    let forma: any = this;

    if (control.value !== forma.controls['password1'].value) {
      return {
        noiguales: true
      }
    }

    return null;

  }

}
