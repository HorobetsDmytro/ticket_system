import React, { useState } from 'react';
import TicketDrawer from './ticketSystem.js';

function App() {
  const [ticketCount] = useState(20);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center mb-4">Програма "Тягни білет"</h1>
          <TicketDrawer initialTickets={ticketCount} />
        </div>
      </div>
    </div>
  );
}

export default App;