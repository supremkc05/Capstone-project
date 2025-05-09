const express = require('express');
const mongoose = require('mongoose')
const collection = require('./mongo')
const app = express();
const PORT = 3000;
const uri = "mongodb+srv://samirguragain9:mcDPjosxUZPauxUA@cluster0.l9dbgr0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

try {
  mongoose.connect(uri);
} catch (error) {
  console.error("Error connecting to the database:", error);
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

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

app.post('/Login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await collection.findOne({ email: email });
    if (user) {
      if (user.password == password) {
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
