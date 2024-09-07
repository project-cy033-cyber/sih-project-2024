const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');

// Set up storage for profile pictures
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the upload directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

// Initialize multer with the defined storage
const upload = multer({ storage: storage });

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'yourUsername', // Replace with your MySQL username
    password: 'yourPassword', // Replace with your MySQL password
    database: 'yourDatabase' // Replace with your MySQL database name
});

// Create Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the MySQL database.');
    }
});

// Profile creation route
app.post('/create-profile', upload.single('profilePhoto'), (req, res) => {
    const { fullName, email, password, bio } = req.body;
    const profilePhoto = req.file ? req.file.path : '';

    const sql = 'INSERT INTO users (fullName, email, password, bio, profilePhoto) VALUES (?, ?, ?, ?, ?)';
    
    db.query(sql, [fullName, email, password, bio, profilePhoto], (err, results) => {
        if (err) {
            return res.status(400).json({ message: 'Error saving profile', error: err });
        }
        res.status(201).json({ message: 'Profile created successfully' });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
