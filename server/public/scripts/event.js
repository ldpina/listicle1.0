const renderEvent = async () => {
    const requestedID = parseInt(window.location.href.split('/').pop());
    const response = await fetch('/events');
    const data = await response.json();
    const eventContent = document.getElementById('event-content');
    let event;
    if (data != null){
        event = data.find(event => event.id === requestedID);
        document.getElementById('image').src = event.image;
        document.getElementById('eventName').textContent = event.eventName;
        document.getElementById('artists').textContent = 'Artist(s): ' + event.artists;
        document.getElementById('dateTime').textContent = 'When: ' + event.date + ' at ' + event.time;
        document.getElementById('venue').textContent = 'Venue: ' + event.venue;
        document.getElementById('genre').textContent = 'Genre: ' + event.genre;
        document.getElementById('ticketPrice').textContent = 'Ticket Price: $' + event.ticketPrice;
        document.title = `Live Events- ${event.eventName}`;

    }
    else{
        const message = document.createElement('h2');
        message.textContent = 'No events Available 😞';
        giftContent.appendChild(message);
    }


}

renderEvent();