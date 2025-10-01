import express from 'express';
import './config/dotenv.js';
import eventsRouter from './routes/events.js';

const app = express();


app.use(express.static('./public'));


app.get('/', (req, res) => {
  res.sendFile('index.html', { root: './public' });
});


app.use('/events', eventsRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
