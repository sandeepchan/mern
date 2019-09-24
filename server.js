const express = require('express'),
  app = express();
const connectDb = require('./config/db');
//connectdb
connectDb();
//Middleware
app.use(express.json({ extended: false }));
app.get('/', (req, res) => {
  res.send('hi');
});
//Define Route
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
const Port = process.env.Port || 5000;
app.listen(Port, () => console.log(`Server Started in port ${Port}`));
