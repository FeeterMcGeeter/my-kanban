const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connecting the database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Defining routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

// Serve static assets in production
if(process.env.NODE_ENV === 'production') {
    // SET STATIC FOLDER
    app.use(express.static('client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

// Connecting to server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});