const noteService = require('./note.service')
const logger = require('../../services/logger.service')

//?- GET LIST
async function getNotes(req, res) {
    try {
        logger.debug('Getting Notes')
        const filterBy = (req.query) ? req.query : null
        const notes = await noteService.query(filterBy)
        res.json(notes)
    } catch (error) {
        logger.error('Failed to get Notes', error)
        res.status(500).send({ err: 'Failed to get Notes' })
    }
}

//?- GET BY ID
async function getNote(req, res) {
    try {
        logger.debug('Getting Note')
        const { noteId } = req.params
        const note = await noteService.getById(noteId)
        res.json(note)
    } catch (error) {
        logger.error('Failed to get Note', error)
        res.status(500).send({ err: 'Failed to get Note' })
    }
}

//?- CREATE
async function addNote(req, res) {
    try {
        logger.debug('Adding Note')
        const note = req.body
        const addedNote = await noteService.add(note)
        res.json(addedNote)
    } catch (error) {
        logger.error('Failed to add Note', error)
        res.status(500).send({ err: 'Failed to add Note' })
    }
}

//?- UPDATE
async function updateNote(req, res) {
    try {
        logger.debug('Updating note')
        const note = req.body
        const updatedNote = await noteService.update(note)
        res.json(updatedNote)
    } catch (error) {
        logger.error('Failed to update Note', error)
        res.status(500).send({ err: 'Failed to update Note' })
    }
}

//?- DELETE
async function removeNote(req, res) {
    try {
        logger.debug('Removing Note')
        const { noteId } = req.params
        const removedNote = await noteService.remove(noteId)
        res.json(removedNote)
    } catch (error) {
        logger.error('Failed to remove Note', error)
        res.status(500).send({ err: 'Failed to remove Note' })
    }
}

module.exports = {
    getNotes,
    getNote,
    addNote,
    updateNote,
    removeNote
}  