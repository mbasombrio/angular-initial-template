import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { PaginatedResponseDTO } from '@models/PaginatedReposponseDTO';
import { UserDTO } from '@models/userDTO';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-promesas',
  standalone: true,
  imports: [],
  templateUrl: './promesas.component.html',
  styleUrl: './promesas.component.scss',
})
export class PromesasComponent implements OnInit {
  private http = inject(HttpClient);

  ngOnInit(): void {
    this.getUsuarios().subscribe((resp) => {
      console.log(resp.data);
    });
  }

  getUsuarios(): Observable<PaginatedResponseDTO<UserDTO>> {
    return this.http.get<PaginatedResponseDTO<UserDTO>>(
      'https://reqres.in/api/users'
    );
  }
}
