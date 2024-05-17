import express from 'express';
import routes from './router/routes';

const app = express();

app.use(express.json());
app.use('/api', routes);
app.get('/', (req, res) => {
  res.send('¡Hola, Bienvenido al sistema!');
});

export default app;
