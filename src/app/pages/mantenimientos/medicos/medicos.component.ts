import { NgIf } from '@angular/common';
import { Component, effect, EffectRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerComponent } from '@components/spinner/spinner.component';
import { Medico } from '@models/Hospital/medico.model';
import { ImagenPipe } from '@pipes/imagen.pipe';
import { BusquedasService } from '@services/busquedas.service';
import { MedicoService } from '@services/medico.service';
import { MessagesService } from '@services/messages.service';
import { ModalImageService } from '@services/modal-image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  standalone: true,
  imports: [SpinnerComponent, ImagenPipe, NgIf],
  templateUrl: './medicos.component.html',
  styleUrl: './medicos.component.scss',
})
export class MedicosComponent {
  medicoService = inject(MedicoService);
  messageService = inject(MessagesService);
  busquedaService = inject(BusquedasService);
  router = inject(Router);
  public modalImagenService = inject(ModalImageService);

  private destroyEffect: EffectRef | null = null;

  medicos: Medico[] = [];
  loading = false;

  constructor() {
    this.destroyEffect = effect(
      () => {
        if (this.modalImagenService.changeImage()) {
          this.getMedicos(); // Actualiza la lista de medicos
          this.modalImagenService.changeImage.set(false); // Resetea el signal
        }
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit(): void {
    this.getMedicos();
  }

  getMedicos() {
    this.loading = true;
    this.medicoService.getMedicos().subscribe({
      next: (medicos) => {
        this.medicos = medicos;
      },
      error: (err) => {
        this.messageService.errorMessage(
          'Error al cargar los medicos',
          err.error.msg
        );
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  eliminar(medico: Medico) {
    this.messageService.questionMessage(
      'Eliminar medico',
      `¿Estas seguro de eliminar a ${medico.nombre}?`,
      () => {
        if (!medico.uid) return;
        this.loading = true;
        this.medicoService.deleteMedico(medico.uid || '').subscribe({
          next: () => {
            this.getMedicos();
            this.messageService.successMessage(
              'medico eliminado',
              'El medico ha sido eliminado correctamente'
            );
          },
          error: (err) => {
            this.messageService.errorMessage(
              'Error al eliminar medico',
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

  openModal(medico: Medico) {
    this.modalImagenService.abrirModal(medico.uid || '', 'medicos', medico.img);
  }

  actualizarMedico(medico: Medico) {
    if (!medico.uid) {
      this.messageService.errorMessage(
        'Error',
        'El medico no tiene un UID válido'
      );
      return;
    }
    this.router.navigate(['/dashboard/medico', medico.uid]);
    // this.loading = true;
    // TODO: Implementar la actualización del medico en la pagina de medico
    /* const data = {
      nombre: medico.nombre,
      uid: medico.uid,
    }; */
    /*  this.medicoService.updateMedico(data).subscribe({
      next: () => {
        this.messageService.successMessage(
          'medico actualizado',
          'El medico ha sido actualizado correctamente'
        );
      },
      error: (err) => {
        this.messageService.errorMessage(
          'Error al actualizar medico',
          err.error.msg
        );
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    }); */
  }

  async AgregarMedico() {
    const inputValue = '';
    const { value: medicoName } = await Swal.fire({
      title: 'Ingrese el nombre del medico',
      input: 'text',
      inputLabel: 'Nombre del medico',
      inputValue,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Ingrese un valor';
        }
        return null;
      },
    });
    if (medicoName) {
      this.createmedico(medicoName);
    }
  }

  createmedico(nombre: string) {
    this.loading = true;
    this.medicoService.createMedico({ nombre }).subscribe({
      next: () => {
        this.getMedicos();
        this.messageService.successMessage(
          'medico creado',
          'El medico ha sido creado correctamente'
        );
      },
      error: (err) => {
        console.log({ err });
        this.messageService.errorMessage(
          'Error al crear medico',
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
      return this.getMedicos();
    }

    this.busquedaService.buscar('medicos', termino).subscribe({
      next: (medicos) => {
        this.medicos = medicos;
      },
      error: (err) => {
        this.messageService.errorMessage(
          'Error al buscar medicos',
          err.error.msg
        );
      },
    });
  }
}
