const express = require("express");

const router = express.Router();

// Create GET request
router.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// all db users
router.get("/users", async (req, res) => {
  const alldbusers = await User.find();
  const html = `<ul> ${alldbusers
    .map((user) => `<li>${user.name} - ${user.email}</li>`)
    .join("")}</ul>`;
  res.send(html);
});

// Create POST request
router.post("/api/users", async (req, res) => {
  const { name, age, gender, email, jobTitle } = req.body;

  if (!name || !age || !gender || !email || !jobTitle) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    const user = new User({ name, age, gender, email, jobTitle });
    await user.save();
    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Create PUT request
router.put("/api/users/:id", async (req, res) => {
  const { name, age, gender, email, jobTitle } = req.body;
  const id = req.params.id;
  if (!name || !age || !gender || !email || !jobTitle) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, age, gender, email, jobTitle },
      { new: true }
    );
    return res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Create DELETE request
router.delete("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
