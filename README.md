# Concurrent Ticket Booking UI
This repository contains the standalone Angular 17 frontend application for the Concurrent Ticket Booking Service. It provides a user interface to view event availability and safely book tickets, communicating with the Spring Boot backend microservice.

## Project Overview

### Description
A single-page application (SPA) built with Angular 17 and Angular Material to interact with the ticket booking backend API.

### Objective
To provide a clear, functional UI for listing events and performing concurrent, safe ticket booking transactions.

## Approach
The frontend was built using the following key architectural decisions:
   - **Standalone Components:** Utilized modern Angular 17 architecture, keeping modules to a minimum for a cleaner, more efficient setup.
   - **Decoupling:** Implemented a dedicated EventService to handle all API communication, isolating the HttpClient logic from the UI components.
   - **User Feedback:** Used Angular Material components **_(MatDialog, MatSnackBar, MatProgressSpinner) _** to provide immediate and clear feedback to the user on success, failure (e.g., "Sold Out"), or while loading.
   - **Proxy Configuration:** Configured a local proxy (proxy.conf.json) to handle cross-origin requests, routing all /api calls to the Spring Boot backend (http://localhost:8080).
### Trade-offs and Assumptions
   - **Routing :**
         No Angular Router used - Simplified the project scope, as only a single view (EventListComponent) was required.
   - **State Management :**
         Local component state is sufficient -For a simple application, reliance on component re-fetch (loadEvents()) after a successful booking is acceptable instead of using a complex state management library.
   - **Event Data :**
          Events are read-only from the UI - Creation/modification of events is handled by pre-loading the H2 database, keeping the UI focused purely on the booking workflow.

## Challenges Faced
   - **API Mapping :** Ensuring the frontend model (Event interface) correctly matched the DTO (EventDTO) being returned by the Spring Boot backend DTOs.
   - **Dialog Data Flow :** Correctly passing the selected Event object to the BookDialogComponent and ensuring the main EventListComponent received a successful confirmation flag (true) to trigger a data refresh.

### Project Setup

## Prerequisites
   - **Node.js & npm :** (v18.x or later)
   - **Angular CLI :** (v17.x or later)
   - **Backend Running :** The Spring Boot backend must be running on http://localhost:8080 before starting the frontend.
     
## Installation

**Clone the repository**:
   ```bash
   git clone https://github.com/PranavMS007/ConcurrentTicketBooking-UI.git
   cd ConcurrentTicketBooking-UI
   ```
**Build the project**:
   ```bash
   # Install all required npm packages (Angular, Material, etc.)
   npm install
   ```

**Running the Application**
   ```bash
   ng serve
   ```
The application will be accessible at: http://localhost:4200

## UI Screenshots
1. Event Listing
   
![Events list](https://github.com/PranavMS007/ConcurrentTicketBooking-UI/blob/main/images/1.png?raw=true)

2. Book tickets
   
![Book tickets](https://github.com/PranavMS007/ConcurrentTicketBooking-UI/blob/main/images/2.png?raw=true)


3. successful booking
   
![successful booking](https://github.com/PranavMS007/ConcurrentTicketBooking-UI/blob/main/images/3.png?raw=true)


4. Sold out listing
   
![Sold out listing](https://github.com/PranavMS007/ConcurrentTicketBooking-UI/blob/main/images/4.png?raw=true)


5. Trying to book more that the available ticket
   
![Failed booking](https://github.com/PranavMS007/ConcurrentTicketBooking-UI/blob/main/images/5.png?raw=true)


## Known Issues and Limitations
   - **No User Context:** The booking request does not include a user ID, as the service focuses solely on concurrent inventory management. All bookings are essentially anonymous.

   - **Instant Refresh Only:** The ticket count only updates after a booking is completed or manually refreshed. It does not poll or use WebSockets for real-time updates from other users.


### Future Improvements
1. **Add User Authentication:** Integrate Spring Security and JWT validation to establish user identity.
2. **Real-time Updates:** Implement WebSockets (e.g., via Spring's STOMP over WebSockets) to push real-time ticket availability changes to all viewing clients.
3. **Better Validation:** Implement client-side validation using Angular's reactive forms instead of just basic template-driven forms.
4. **Dedicated Status Page:** Implement the asynchronous booking pattern as discussed and create a dedicated status page to track pending, successful, or failed bookings.

### Scalability Considerations
From a frontend perspective, the current architecture is lightweight and highly scalable, as the heavy transactional lifting is delegated to the Spring Boot backend. The biggest future consideration is handling real-time data delivery without overwhelming the client, which points back to the need for a WebSocket solution.
