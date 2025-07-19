const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

// Import controllers
const {
  getContacts,
  createContact,
  getContactById,
  updateContact,
  deleteContact,
} = require("../controllers/contactControllers");

// Protected Routes
router.route("/")
  .get(protect, getContacts)          // GET /api/contacts
  .post(protect, createContact);      // POST /api/contacts

router.route("/:id")
  .get(protect, getContactById)       // GET /api/contacts/:id
  .put(protect, updateContact)        // PUT /api/contacts/:id
  .delete(protect, deleteContact);    // DELETE /api/contacts/:id

module.exports = router;
