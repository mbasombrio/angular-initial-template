import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hospital } from '@models/Hospital/hospital.model';
import { Medico } from '@models/Hospital/medico.model';
import { Usuario } from '@models/Hospital/usuario.model';
import { ImagenPipe } from '@pipes/imagen.pipe';
import { BusquedasService } from '@services/busquedas.service';

@Component({
  selector: 'app-busquedas',
  standalone: true,
  imports: [ImagenPipe],
  templateUrl: './busquedas.component.html',
  styleUrl: './busquedas.component.scss',
})
export class BusquedasComponent {
  activatedRoute = inject(ActivatedRoute);
  busquedaService = inject(BusquedasService);
  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  router = inject(Router);
  constructor() {
    this.activatedRoute.params.subscribe(({ termino }) => {
      console.log('termino', termino);
      if (!termino) {
        this.router.navigateByUrl('/');
        return;
      } else if (termino.length < 1) {
        this.router.navigateByUrl('/');
        return;
      }
      this.buscador(termino);
    });
  }

  buscador(termino: string) {
    this.busquedaService.busquedaGlobal(termino).subscribe((resp) => {
      this.usuarios = resp.usuarios;
      this.medicos = resp.medicos;
      this.hospitales = resp.hospitales;
    });
  }
}
