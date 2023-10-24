import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import Swal from 'sweetalert2';

import { MarcaService } from '../../../service/marca.service';
import { Marca } from '../../../models/marca';


const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
});

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {

  marcas$: BehaviorSubject<Marca[]> = new BehaviorSubject<Marca[]>([]);
  marcas: Marca[] = [];
  selectedMarca: Marca | null = null;
  newMarca: Marca = { id: 0, nombre: '', descripcion: '' };
  marcaForm: FormGroup;
  marcaSeleccionado: Marca = new Marca();
  modoEdicion = false;
  sinDatos = false;

  constructor(public marcaService: MarcaService, public fb: FormBuilder, public cd: ChangeDetectorRef, public router: Router) {
    this.marcaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      descripcion: ['', [Validators.maxLength(500)]],
    });
    this.marcas$ = new BehaviorSubject<Marca[]>([]);
  }

  ngOnInit() {

    this.loadMarcas();

  }
  selectMarca(marca: Marca) {
    this.selectedMarca = marca;
  }
  loadMarcas() {
    this.marcaService.getMarcas().subscribe((marcas) => {
      this.marcas = marcas;
      this.sinDatos = marcas.length === 0;

    });
  }

  abrirModal(modalId: string) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block';
    }
  }

  abrirModalCrearMarca() {
    this.marcaSeleccionado = new Marca();
    this.modoEdicion = false;
    this.marcaForm.reset();
    this.abrirModal('crearMarcaModal'); // Cambiar 'crearAutoModal' a 'crearMarcaModal'
  }

  abrirModalEditarMarca(marca: Marca) {
    this.marcaSeleccionado = marca;
    this.modoEdicion = true;
    this.marcaForm.patchValue(marca);
    this.abrirModal('crearMarcaModal');
  }

  // Función para cerrar el modal
  cerrarModal(modalId: string) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'none';
    }
  }

  createMarca(form: FormGroup) {
    if (form.valid) {

      if (this.modoEdicion) {
        this.updateMarca();
      } else {

        const nuevaMarca: Marca = {
          id: null, // Opcional, dependiendo de tu lógica
          nombre: form.get('nombre').value,
          descripcion: form.get('descripcion').value
        };

        this.marcaService.createMarca(nuevaMarca).subscribe(
          (response: Marca) => {
            // Manejar la respuesta, que podría incluir la marca recién creada
            console.log('Marca creada:', response);
            this.cerrarModal('crearMarcaModal');
            // Limpia el formulario después de la creación.
            form.reset();

            // Vuelve a cargar la lista de marcas para reflejar la nueva marca.
            this.loadMarcas();

            Swal.fire(
              'Éxito!',
              'Marca creada correctamente!',
              'success'
            );
          },
          (error) => {
            // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario.
            console.error('Error al crear la marca:', error);
          }
        );
      }
    }
  }

  updateMarca() {
    if (this.marcaForm.valid && this.marcaSeleccionado) {
      const marcaActualizada = { ...this.marcaForm.value };
      this.marcaService.updateMarca(this.marcaSeleccionado.id, marcaActualizada).subscribe((marca) => {
        console.log('Marca actualizada');
        this.cerrarModal('crearMarcaModal');
        this.loadMarcas();
        this.modoEdicion = false;
        this.marcaSeleccionado = null;
        Swal.fire('Marca editada', `Su marca fue editada correctamente`, 'success')
      }, (error) => {
        console.error('Error al actualizar la marca:', error);
      });
    }
  }

  deleteMarca(marca: Marca) {

    if (marca.id) {
      Swal.fire({
        title: 'Quieres borrar esta marca?',
        text: "No podrás revertir esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar!'

      }).then((result) => {

        if (result.isConfirmed) {

          this.marcaService.deleteMarca(marca.id).subscribe(() => {
            this.marcas = this.marcas.filter((m) => m.id !== marca.id);
            this.selectedMarca = null;
            this.loadMarcas();
            Swal.fire('Marca borrada', `${marca.nombre} fue eliminada correctamente`, 'success');
          },
            (error) => {
              console.error('Error al eliminar la marca:', error);
              if (error.status === 500) {
                Swal.fire(
                  'Lo siento!',
                  'Marca asociada a un auto, imposible de eliminar! a menos que elimines el auto... !',
                  'info'
                )
              }
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Su marca esta sana y salva :)',
            'error'
          );
        }
      });
    }
  }
}