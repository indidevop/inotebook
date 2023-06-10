const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Notes')
const { body, validationResult } = require('express-validator');


// ROUTE 1 : get all the notes .Login required
// fetchuser adds user:{id} to req
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.send(notes)
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error")
    }

})

// ROUTE 2 : Add a new note .Login required
router.post('/addnote', fetchuser, [
    // Validations
    body('title', 'Title cannot be empty').exists(),
    body('description', 'Describe your note').exists(),
],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { title, description, tag } = req.body;
            const newNote = await Note.create({
                title, description, tag, user: req.user.id
            })

            res.send(newNote)
        } catch (error) {
            console.error(error)
            res.status(500).send("Internal server error")
        }
    })


// ROUTE 3 : Update an existing note .Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        let newNote = {};

        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        // Check if note exists
        let note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).send("Not Found")
        }

        // Check note belongs to which user
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }

        // Update the note
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })

        res.json(note)

    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error")
    }
})

// ROUTE 4 : Delete an existing note .Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {

        // Check if note exists
        let note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).send("Not Found")
        }

        // Check note belongs to which user
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }

        // Delete the note
        note = await Note.findByIdAndDelete(req.params.id)

        res.json({ "Success": "Deleted", note: note })
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error")
    }
})





module.exports = router