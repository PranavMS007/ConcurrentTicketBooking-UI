import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root' 
})
export class EventService {
  
  private apiUrl = '/api/tickets';

  constructor(private http: HttpClient) { }

  /**
   * Fetches all events from the backend.
   */
  getEvents(): Observable<Event[]> {
    console.log('Service: Fetching all events');
    return this.http.get<Event[]>(this.apiUrl);
  }

  /**
   * To book a number of tickets for a specific event.
   */
  bookTickets(id: number, count: number): Observable<any> {
    console.log(`Service: Attempting to book ${count} tickets for event ${id}`);
    
    const params = new HttpParams().set('count', count.toString());

    return this.http.post(`${this.apiUrl}/${id}/book`, null, { params });
  }
}