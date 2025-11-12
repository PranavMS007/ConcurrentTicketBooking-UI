import { Component } from '@angular/core';
import { EventListComponent } from './components/event-list/event-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    MatToolbarModule,
    EventListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Event Booking Service';
}
