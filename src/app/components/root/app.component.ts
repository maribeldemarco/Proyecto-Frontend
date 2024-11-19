import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActualizarComponent } from '../actualizar/actualizar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ActualizarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Proyecto-Fontend';
}
