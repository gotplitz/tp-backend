const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

// Body Parse Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Database connection command
connectDB();

app.use(express.json({ extended: false }));

var filesPath = path.join(__dirname, 'uploads');

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/sliders', require('./routes/api/sliders'));
app.use('/api/noticias', require('./routes/api/noticias'));
app.use('/api/promos', require('./routes/api/promos'));
app.use('/api/logs', require('./routes/api/logs'));
app.use('/api/pages', require('./routes/api/pages'));
app.use('/api/testimonials', require('./routes/api/testimonials'));
app.use('/api/uploads', require('./routes/api/uploads'));
app.use('/api/emails', require('./routes/api/emails'));
app.use('/api/locations', require('./routes/api/locations'));
app.use('/api/services', require('./routes/api/services'));

// Set static folder
app.use(express.static('admin/build'));
app.use('/uploads', express.static(filesPath));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'admin', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5082;

app.listen(PORT, () =>
    console.log(`Ferocious Media NodeJS server is running @ ${PORT}`)
);
