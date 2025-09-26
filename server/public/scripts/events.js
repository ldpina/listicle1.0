const renderEvents = async () => {
  const response = await fetch('/events');
  const data = await response.json();
  const mainContent = document.getElementById('main-content');

  if (data && data.length > 0) {
    data.map(event => {
    const article = document.createElement('article');
    article.classList.add('event-card');

    
    const img = document.createElement('img');
    img.src = event.image;
    img.alt = event.eventName;
    img.style.width = '300px';
    img.style.height = '300px';
    img.style.objectFit = 'cover';

    
    const info = document.createElement('div');
    info.classList.add('event-info');

    const name = document.createElement('h3');
    name.textContent = event.eventName;

    const artist = document.createElement('p');
    artist.innerHTML = `<strong>Artist:</strong> ${event.artists}`;

    const venue = document.createElement('p');
    venue.innerHTML = `<strong>Location:</strong> ${event.venue}`;

    const link = document.createElement('a');
    link.textContent = 'Read More ›';
    link.setAttribute('role', 'button');
    const base = location.port === '5173' ? 'http://localhost:3001' : '';
    link.href = `${base}/events/${event.id}`;

   
    info.appendChild(name);
    info.appendChild(artist);
    info.appendChild(venue);
    info.appendChild(link);

   
    article.appendChild(img);
    article.appendChild(info);

    mainContent.appendChild(article);
    });

  } else {
    const message = document.createElement('h2');
    message.textContent = 'No events Available 😞';
    mainContent.appendChild(message);
  }
};

const requestedUrl = window.location.href.split('/').pop();

if (requestedUrl){
    window.location.href = '../404.html';
}
else{
    renderEvents()
}

