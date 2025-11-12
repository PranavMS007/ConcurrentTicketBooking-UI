import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { BookDialogComponent } from '../book-dialog/book-dialog.component';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent implements OnInit{

  displayedColumns: string[] = ['eventName', 'availableTickets', 'action'];
  
  events: Event[] = [];
  
  isLoading = true;
  loadError: string | null = null;

  constructor(
    private eventService: EventService,
    private dialog: MatDialog 
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  /**
   * Fetches the list of events from BE.
   */
  loadEvents(): void {
    this.isLoading = true;
    this.loadError = null;

    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.events = data;
        this.isLoading = false;
        console.log('Events loaded:', data);
      },
      error: (err) => {
        console.error('Failed to load events', err);
        this.isLoading = false;
        this.loadError = 'Failed to load events. Please try again later.';
      }
    });
  }

  /**
   * Opens the BookDialogComponent for booking the tickets.
   */
  openBookDialog(event: Event): void {
    console.log('Opening dialog for:', event.eventName);
    
    const dialogRef = this.dialog.open(BookDialogComponent, {
      width: '400px',
      data: { event: event } 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed. Result:', result);
      if (result === true) {
        this.loadEvents();
      }
    });
  }
}
