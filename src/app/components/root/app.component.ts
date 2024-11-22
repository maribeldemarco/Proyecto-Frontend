import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MdbCollapseModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  navs = [
    {
      "nombre": "Inicio",
      "ruta": "home"
    },
    {
      "nombre": "Inventario",
      "ruta": "inventario"
    },
    {
      "nombre": "Agregar producto",
      "ruta": "agregar-producto"
    },
    {
      "nombre": "Editar producto",
      "ruta": "editar-producto"
    }
  ];

  select(e: any) {
    let active = e.currentTarget.getAttribute('id');
    let navs = document.querySelectorAll('.nav-link');
    navs.forEach((element) => {
      if (element.id == active) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });
  }
}
