import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { Auto } from '../../../models/auto';
import { AutoService } from 'src/app/service/auto.service';
import { MarcaService } from 'src/app/service/marca.service';
import { Marca } from 'src/app/models/marca';
import Swal from 'sweetalert2';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
});


@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html',
  styleUrls: ['./autos.component.css']
})
export class AutosComponent implements OnInit {

  autos: Auto[] = [];
  autoSeleccionado: Auto = new Auto();
  modoEdicion = false;
  marcas: Marca[] = [];

  sinDatos = false;


  constructor(public router: Router, public autoService: AutoService, public marcaService: MarcaService) { }

  ngOnInit(): void {
    this.cargarAutos();
    this.cargarMarcas();
    if (this.autos.length === 0) {
      this.sinDatos = true;
    }
  }

  abrirModalCrearAuto() {
    // Restablecer el objeto de autoSeleccionado para crear un nuevo auto
    this.autoSeleccionado = new Auto();;
    this.modoEdicion = false;
    this.abrirModal('crearAutoModal');
  }

  abrirModalEditarAuto(auto: any) {
    // Usar los datos del auto existente para la edición
    this.autoSeleccionado = { ...auto };
    this.modoEdicion = true;
    this.abrirModal('crearAutoModal');
  }

  abrirModal(modalId: string) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block';
    }
  }

  cerrarModal(modalId: string) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'none';
    }
  }



  cargarAutos(): void {
    this.autoService.obtenerAutos().subscribe((autos) => {
      this.autos = autos;
      this.sinDatos = autos.length === 0;
    });
  }
  cargarMarcas(): void {
    this.marcaService.getMarcas().subscribe((marcas) => {
      this.marcas = marcas;
    });
  }

  seleccionarAuto(auto: Auto): void {
    this.autoSeleccionado = { ...auto };
    this.modoEdicion = true;
  }

  guardarAuto(): void {
    if (this.modoEdicion) {
      this.autoService.actualizarAuto(this.autoSeleccionado).subscribe(() => {
        this.cerrarModal('crearAutoModal');
        this.cargarAutos();
        this.limpiarFormulario();
        Swal.fire('Auto editado', `Su auto fue editado correctamente`, 'success')

      });
    } else {
      this.autoService.crearAuto(this.autoSeleccionado).subscribe(() => {
        this.cerrarModal('crearAutoModal');
        this.cargarAutos();
        this.limpiarFormulario();
        Swal.fire('Auto creado', `Su auto fue creado correctamente`, 'success')

      });
    }
  }



  eliminarAuto(id: number): void {

    Swal.fire({
      title: 'Seguro quieres eliminar este auto?',
      text: "No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borralo!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.autoService.eliminarAuto(id).subscribe(() => {
          this.cargarAutos();
          this.limpiarFormulario();
          Swal.fire(
            'Eliminado!',
            'Su auto ha sido eliminado.',
            'success'
          )
        }


        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Su auto esta sano y salvo :)',
          'error'
        )
      }
    })
  }

  limpiarFormulario(): void {
    this.autoSeleccionado = new Auto();
    this.modoEdicion = false;
  }


}
