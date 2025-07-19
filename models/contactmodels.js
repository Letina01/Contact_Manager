const db = require('../config/db');

// Get all contacts
const getAllContacts = async () => {
  const [rows] = await db.query('SELECT * FROM contacts');
  return rows;
};

// Get a single contact by ID
const getContactById = async (id) => {
  const [rows] = await db.query('SELECT * FROM contacts WHERE id = ?', [id]);
  return rows[0];
};

// Create a new contact
const createContact = async (name, email, phone) => {
  const [result] = await db.query(
    'INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)',
    [name, email, phone]
  );
  return result.insertId;
};

// Update an existing contact
const updateContact = async (id, name, email, phone) => {
  const [result] = await db.query(
    'UPDATE contacts SET name = ?, email = ?, phone = ? WHERE id = ?',
    [name, email, phone, id]
  );
  return result.affectedRows;
};

// Delete a contact
const deleteContact = async (id) => {
  const [result] = await db.query('DELETE FROM contacts WHERE id = ?', [id]);
  return result.affectedRows;
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
