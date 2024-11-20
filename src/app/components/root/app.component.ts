import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComponenteAgregarComponent } from "../componente-agregar/componente-agregar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ComponenteAgregarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Proyecto-Fontend';
}