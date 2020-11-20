// --- not used ---- 
//import express module
const router = require('express').Router();
const path = require('path');

//GET routes and sending to 
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/note-list.html'));
});

router.get('/add-note', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/add-note.html'));
});

router.get('/note', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/note.html'));
});

module.exports = router;