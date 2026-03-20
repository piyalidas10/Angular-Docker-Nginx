import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [FormsModule, RouterOutlet],
})
export class AppComponent {}
