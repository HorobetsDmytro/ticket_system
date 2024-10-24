import React, { useState } from 'react';

const TicketDrawer = ({ initialTickets }) => {
  const [availableTickets, setAvailableTickets] = useState(
    Array.from({ length: initialTickets }, (_, i) => i + 1)
  );
  const [drawnTicket, setDrawnTicket] = useState(null);
  const [drawnHistory, setDrawnHistory] = useState([]); // Новий state для історії
  const [showAddMore, setShowAddMore] = useState(false);
  const [additionalTickets, setAdditionalTickets] = useState('');
  const [lastTicketNumber, setLastTicketNumber] = useState(initialTickets);

  const drawTicket = () => {
    if (availableTickets.length === 0) {
      const wantMore = window.confirm('Усі білети вже вибрані! Чи бажаєте додати ще білети?');
      if (wantMore) {
        setShowAddMore(true);
      }
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableTickets.length);
    const drawn = availableTickets[randomIndex];
    setDrawnTicket(drawn);
    // Додаємо витягнутий білет до історії
    setDrawnHistory([...drawnHistory, drawn]);
    setAvailableTickets(availableTickets.filter(ticket => ticket !== drawn));
  };

  const handleAddTickets = () => {
    const numTickets = parseInt(additionalTickets);
    if (isNaN(numTickets) || numTickets <= 0) {
      alert('Будь ласка, введіть коректне число білетів');
      return;
    }

    const newTickets = Array.from(
      { length: numTickets }, 
      (_, i) => lastTicketNumber + i + 1
    );

    setAvailableTickets([...availableTickets, ...newTickets]);
    setLastTicketNumber(lastTicketNumber + numTickets);
    setShowAddMore(false);
    setAdditionalTickets('');
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-4">Тягни білет</h2>
          
          <button 
            onClick={drawTicket}
            className="btn btn-primary mb-3"
          >
            Витягнути білет
          </button>

          {drawnTicket && (
            <div className="alert alert-success" role="alert">
              Ви витягнули білет номер: {drawnTicket}
            </div>
          )}
          
          <div className="alert alert-info" role="alert">
            Залишилось білетів: {availableTickets.length}
          </div>

          {showAddMore && (
            <div className="input-group mt-3">
              <input
                type="number"
                value={additionalTickets}
                onChange={(e) => setAdditionalTickets(e.target.value)}
                placeholder="Кількість нових білетів"
                className="form-control"
              />
              <button 
                onClick={handleAddTickets}
                className="btn btn-success"
              >
                Додати білети
              </button>
            </div>
          )}

          {/* Секція з історією витягнутих білетів */}
          {drawnHistory.length > 0 && (
            <div className="mt-4">
              <h3 className="card-subtitle mb-3">Історія витягнутих білетів:</h3>
              <div className="card bg-light">
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    {drawnHistory.map((ticket, index) => (
                      <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Спроба {index + 1}</span>
                        <span className="badge bg-primary rounded-pill">Білет #{ticket}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketDrawer;