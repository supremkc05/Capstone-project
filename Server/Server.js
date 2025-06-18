const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const collection = require('./mongo'); // Assuming this is your Mongoose User model
const Detection = require('./detection');
const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors());


app.use(express.json());

// MongoDB connection
const uri = "mongodb://localhost:27017/your_database_name"; // Replace with your database name
try {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("Error connecting to the database:", error);
}

// Multer setup for image upload (in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Root endpoint
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});


app.post('/pothole-detection', async (req, res) => {
  try {
    const { latitude, longitude, timestamp } = req.body;

    // Create new detection
    const detection = new Detection({
      latitude,
      longitude,
      timestamp
    });

    // Save to database
    await detection.save();

    res.status(201).json({
      success: true,
      message: 'Pothole detection recorded successfully',
      data: detection
    });
  } catch (error) {
    console.error('Error saving detection:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to record pothole detection',
      error: error.message
    });
  }
});

// Signup endpoint
app.post('/Signup', async (req, res) => {
  const data = req.body;

  try {
    const check = await collection.findOne({ email: data.email });
    if (check) {
      res.json("exist");
    } else {
      const user = new collection(data);
      await user.save();
      console.log("User Saved:", user);
      res.json({ message: "User registered successfully", user: user });
    }
  } catch (e) {
    console.error("Error occurred during signup:", e);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login endpoint
app.post('/Login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await collection.findOne({ email: email });
    if (user) {
      if (user.password === password) {
        res.json({ message: "Login successful", user: user });
      } else {
        res.json({ message: "Incorrect password" });
      }
    } else {
      res.json({ message: "User does not exist" });
    }
  } catch (e) {
    console.error("Error occurred during login:", e);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Profile fetch endpoint
app.get('/Profile', async (req, res) => {
  const email = req.query.email;
  try {
    const user = await collection.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const userObj = {
      email: user.email,
      username: user.username,
      profilepic: user.profilepic ? user.profilepic.toString('base64') : null,
    };

    res.json(userObj);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Server error' });
  }
});

// Profile Picture upload endpoint
app.post('/profilePic', upload.single('profilepic'), async (req, res) => {
  const { email } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const updatedUser = await collection.findOneAndUpdate(
      { email: email },
      { profilepic: file.buffer },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Profile picture updated successfully' });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
