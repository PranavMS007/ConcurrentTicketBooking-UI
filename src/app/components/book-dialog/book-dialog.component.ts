import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Event } from '../../models/event.model';
@Component({
  selector: 'app-book-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './book-dialog.component.html',
  styleUrl: './book-dialog.component.scss'
})
export class BookDialogComponent {

  ticketCount: number = 1;
  isBooking = false;

  constructor(
    public dialogRef: MatDialogRef<BookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { event: Event },
    private eventService: EventService,
    private snackBar: MatSnackBar
  ) {}

  /**
   * Called when the "Book" button is clicked.
   */
  onBook(): void {
    if (this.ticketCount <= 0) {
      this.snackBar.open('You must book at least 1 ticket.', 'Close', { duration: 3000 });
      return;
    }
    
    this.isBooking = true;
    
    this.eventService.bookTickets(this.data.event.id, this.ticketCount).subscribe({
      next: (response) => {
        this.isBooking = false;
        console.log('Booking successful', response);
        this.snackBar.open('Tickets booked successfully!', 'Close', { 
          duration: 3000,
          panelClass: 'success-snackbar' 
        });
        
       
        this.dialogRef.close(true);
      },
      error: (err: HttpErrorResponse) => {
        this.isBooking = false;
        console.error('Booking failed', err);

        const errorMessage = err.error?.error || 'An unknown error occurred.';
        this.snackBar.open(`Booking failed: ${errorMessage}`, 'Close', { 
          duration: 5000,
          panelClass: 'error-snackbar'
        });
      }
    });
  }

  /**
   * Called when the "Cancel" button is clicked.
   */
  onCancel(): void {
    // Just close the dialog, passing no data.
    this.dialogRef.close();
  }
}
