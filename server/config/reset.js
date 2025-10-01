import { pool } from './database.js';
import './dotenv.js';
import eventsData from '../data/events.js';

const createEventsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS events;

    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      image TEXT NOT NULL,
      event_name TEXT NOT NULL,
      artists TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      venue TEXT NOT NULL,
      genre TEXT NOT NULL,
      ticket_price TEXT NOT NULL
    )
  `;

  try {
    await pool.query(createTableQuery);
    console.log('🎉 events table created successfully');
  } catch (err) {
    console.error('⚠️ error creating events table', err);
  }
};

const seedEventsTable = async () => {
  await createEventsTable();

  eventsData.forEach((event) => {
    const insertQuery = {
      text: `INSERT INTO events 
        (image, event_name, artists, date, time, venue, genre, ticket_price) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`
    };

    const values = [
      event.image,
      event.eventName,
      event.artists,
      event.date,
      event.time,
      event.venue,
      event.genre,
      event.ticketPrice
    ];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error('⚠️ error inserting event', err);
        return;
      }

      console.log(`✅ ${event.eventName} added successfully`);
    });
  });
};

seedEventsTable();
