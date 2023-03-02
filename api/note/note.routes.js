const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getNotes, getNote, addNote, updateNote, removeNote } = require('./note.controller')
const router = express.Router()

router.get('/', log, getNotes)
router.get('/:noteId', log, getNote)
router.post('/', addNote)
router.put('/:noteId', updateNote)
router.delete('/:noteId', removeNote)

module.exports = router