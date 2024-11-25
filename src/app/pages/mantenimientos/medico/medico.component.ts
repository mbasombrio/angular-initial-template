import { Component, inject } from '@angular/core';
import { MedicoService } from '@services/medico.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SpinnerComponent } from '@components/spinner/spinner.component';
import { NgIf } from '@angular/common';
import { MessagesService } from '@services/messages.service';
import { Medico } from '@models/Hospital/medico.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { forkJoin } from 'rxjs';
import { HospitalService } from '@services/hospital.service';
import { Hospital } from '@models/Hospital/hospital.model';
import { ImagenPipe } from '@pipes/imagen.pipe';

@Component({
  selector: 'app-medico',
  standalone: true,
  imports: [
    SpinnerComponent,
    NgIf,
    ReactiveFormsModule,
    ImagenPipe,
    RouterLink,
  ],
  templateUrl: './medico.component.html',
  styleUrl: './medico.component.scss',
})
export class MedicoComponent {
  medicoService = inject(MedicoService);
  hospitalService = inject(HospitalService);
  messageService = inject(MessagesService);
  route = inject(ActivatedRoute);
  loading = true;
  medico: Medico | null = null;
  hospitales: Hospital[] = [];

  form = new FormGroup({
    nombre: new FormControl('', Validators.required),
    hospital: new FormControl('0', Validators.required),
  });

  constructor() {
    const id = this.route.snapshot.paramMap.get('id') ?? null;
    if (!id) {
      this.messageService.errorMessage(
        'Error',
        'No se ha encontrado el médico'
      );
      this.loading = false;
      return;
    }

    this.load();
  }

  load() {
    forkJoin([
      this.hospitalService.getHospitales(),
      this.medicoService.getMedicos(),
    ]).subscribe({
      next: ([hospitales, medicos]) => {
        this.loading = false;
        this.hospitales = hospitales;
        this.medico =
          medicos.find(
            (medico) => medico.uid === this.route.snapshot.paramMap.get('id')
          ) || null;
        if (!this.medico) {
          this.messageService.errorMessage('Error', 'Médico no encontrado');
        } else {
          this.initializeForm(this.medico);
        }
      },
      error: (err) => {
        console.log(err);
        this.messageService.errorMessage('Error', 'Médico no encontrado');
        this.loading = false;
      },
    });
  }

  initializeForm(medico: Medico) {
    console.log(medico);
    this.form.setValue({
      nombre: medico.nombre,
      hospital: medico.hospital?._id ?? null,
    });
    this.loading = false;
  }

  guardar() {
    if (this.form.invalid) return;

    const { nombre, hospital } = this.form.value;
    this.medicoService
      .updateMedico({
        nombre: nombre ?? '',
        uid: this.medico?.uid ?? '',
        uidHospital: hospital ?? '',
      })
      .subscribe({
        next: (medico) => {
          this.messageService.successMessage('Éxito', 'Médico actualizado');
          this.medico = medico;
        },
        error: (err) => {
          console.log(err);
          this.messageService.errorMessage('Error', 'No se pudo actualizar');
        },
      });
  }
}
