import { NgIf } from '@angular/common';
import { Component, effect, EffectRef, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '@components/spinner/spinner.component';
import { Hospital } from '@models/Hospital/hospital.model';
import { BusquedasService } from '@services/busquedas.service';
import { HospitalService } from '@services/hospital.service';
import { MessagesService } from '@services/messages.service';
import { ModalImageService } from '@services/modal-image.service';
import { ImagenPipe } from '@pipes/imagen.pipe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  standalone: true,
  imports: [SpinnerComponent, NgIf, FormsModule, ImagenPipe],
  templateUrl: './hospitales.component.html',
  styleUrl: './hospitales.component.scss',
})
export class HospitalesComponent implements OnInit {
  hospitalService = inject(HospitalService);
  messageService = inject(MessagesService);
  busquedaService = inject(BusquedasService);
  public modalImagenService = inject(ModalImageService);

  private destroyEffect: EffectRef | null = null;

  hospitales: Hospital[] = [];
  loading = false;

  constructor() {
    this.destroyEffect = effect(
      () => {
        if (this.modalImagenService.changeImage()) {
          this.getHospitales(); // Actualiza la lista de hospitales
          this.modalImagenService.changeImage.set(false); // Resetea el signal
        }
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit(): void {
    this.getHospitales();
  }

  getHospitales() {
    this.loading = true;
    this.hospitalService.getHospitales().subscribe({
      next: (hospitales) => {
        this.hospitales = hospitales;
      },
      error: (err) => {
        this.messageService.errorMessage(
          'Error al cargar los hospitales',
          err.error.msg
        );
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  eliminar(hospital: Hospital) {
    this.messageService.questionMessage(
      'Eliminar hospital',
      `¿Estas seguro de eliminar a ${hospital.nombre}?`,
      () => {
        if (!hospital.uid) return;
        this.loading = true;
        this.hospitalService.deleteHospital(hospital.uid || '').subscribe({
          next: () => {
            this.getHospitales();
            this.messageService.successMessage(
              'Hospital eliminado',
              'El hospital ha sido eliminado correctamente'
            );
          },
          error: (err) => {
            this.messageService.errorMessage(
              'Error al eliminar hospital',
              err.error.msg
            );
          },
          complete: () => {
            this.loading = false;
          },
        });
      }
    );
  }

  openModal(hospital: Hospital) {
    this.modalImagenService.abrirModal(
      hospital.uid || '',
      'hospitales',
      hospital.img
    );
  }

  actualizarHospital(hospital: Hospital) {
    if (!hospital.uid) {
      this.messageService.errorMessage(
        'Error',
        'El hospital no tiene un UID válido'
      );
      return;
    }
    this.loading = true;
    const data = {
      nombre: hospital.nombre,
      uid: hospital.uid,
    };
    this.hospitalService.updateHospital(data).subscribe({
      next: () => {
        this.messageService.successMessage(
          'Hospital actualizado',
          'El hospital ha sido actualizado correctamente'
        );
      },
      error: (err) => {
        this.messageService.errorMessage(
          'Error al actualizar hospital',
          err.error.msg
        );
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  async AgregarHospital() {
    const inputValue = '';
    const { value: hospitalName } = await Swal.fire({
      title: 'Ingrese el nombre del hospital',
      input: 'text',
      inputLabel: 'Nombre del hospital',
      inputValue,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Ingrese un valor';
        }
        return null;
      },
    });
    if (hospitalName) {
      this.createHospital(hospitalName);
    }
  }

  createHospital(nombre: string) {
    this.loading = true;
    this.hospitalService.createHospital({ nombre }).subscribe({
      next: () => {
        this.getHospitales();
        this.messageService.successMessage(
          'Hospital creado',
          'El hospital ha sido creado correctamente'
        );
      },
      error: (err) => {
        console.log({ err });
        this.messageService.errorMessage(
          'Error al crear hospital',
          err.error.msg
        );
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.getHospitales();
    }

    this.busquedaService.buscar('hospitales', termino).subscribe({
      next: (hospitales) => {
        this.hospitales = hospitales;
      },
      error: (err) => {
        this.messageService.errorMessage(
          'Error al buscar hospitales',
          err.error.msg
        );
      },
    });
  }
}
