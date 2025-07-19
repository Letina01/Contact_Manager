const asyncHandler = require("express-async-handler");
const db = require("../config/db"); // Import your MySQL connection

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Public
const getContacts = asyncHandler(async (req, res) => {
  const [rows] = await db.execute('SELECT * FROM contacts');
  res.status(200).json(rows);
});

// @desc    Create a new contact
// @route   POST /api/contacts
// @access  Public
const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is: ", req.body);
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const [result] = await db.execute(
    'INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)',
    [name, email, phone]
  );

  res.status(201).json({ message: "Contact created", id: result.insertId });
});

// @desc    Get contact by ID
// @route   GET /api/contacts/:id
// @access  Public
const getContactById = asyncHandler(async (req, res) => {
  const [rows] = await db.execute('SELECT * FROM contacts WHERE id = ?', [req.params.id]);

  if (rows.length === 0) {
    res.status(404);
    throw new Error("Contact not found");
  }

  res.status(200).json(rows[0]);
});

// @desc    Update a contact
// @route   PUT /api/contacts/:id
// @access  Public
const updateContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  const [result] = await db.execute(
    'UPDATE contacts SET name = ?, email = ?, phone = ? WHERE id = ?',
    [name, email, phone, req.params.id]
  );

  if (result.affectedRows === 0) {
    res.status(404);
    throw new Error("Contact not found");
  }

  res.status(200).json({ message: "Contact updated" });
});

// @desc    Delete a contact
// @route   DELETE /api/contacts/:id
// @access  Public
const deleteContact = asyncHandler(async (req, res) => {
  const [result] = await db.execute('DELETE FROM contacts WHERE id = ?', [req.params.id]);

  if (result.affectedRows === 0) {
    res.status(404);
    throw new Error("Contact not found");
  }

  res.status(200).json({ message: "Contact deleted" });
});

// Export all controllers
module.exports = {
  getContacts,
  createContact,
  getContactById,
  updateContact,
  deleteContact,
};
