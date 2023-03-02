const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('note')
        var notes = await collection.find(criteria).toArray()
        return notes
    } catch (err) {
        logger.error('cannot find notes', err)
        throw err
    }
}

async function getById(noteId) {
    try {
        const collection = await dbService.getCollection('note')
        const note = await collection.findOne({ _id: ObjectId(noteId) })
        return note
    } catch (err) {
        logger.error(`while finding note ${noteId}`, err)
        throw err
    }
}

async function remove(noteId) {
    try {
        const collection = await dbService.getCollection('note')
        await collection.deleteOne({ _id: ObjectId(noteId) })
        return noteId
    } catch (err) {
        logger.error(`cannot remove note ${noteId}`, err)
        throw err
    }
}

async function add(note) {
    try {
        const collection = await dbService.getCollection('note')
        await collection.insertOne(note)
        return note
    } catch (err) {
        logger.error('cannot insert note', err)
        throw err
    }
}

async function update(note) {
    try {
        const noteId = ObjectId(note._id)
        delete note._id
        const collection = await dbService.getCollection('note')
        await collection.updateOne({ _id: noteId }, { $set: { ...note } })
        return { _id: noteId, ...note }
    } catch (err) {
        logger.error(`cannot update note ${note._id}`, err)
        throw err
    }
}

async function addMsg(msg) {
    try {
        var noteId = ObjectId(msg.noteId)
        delete msg.noteId
        const collection = await dbService.getCollection('note')
        await collection.updateOne({ _id: noteId }, { $push: { msgs: msg } })
    } catch (err) {
        logger.error(`cannot add message ${msg}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (!filterBy) return criteria
    // if (filterBy.maxPrice && filterBy.maxPrice !== 0) criteria.price = { $lte: +filterBy.maxPrice }
    // if (filterBy.term) criteria.name = { $regex: filterBy.term, $options: 'i' }
    // if (filterBy.labels && filterBy.labels.length > 0) criteria.labels = { $all: filterBy.labels }
    // if (filterBy.inStock) criteria.inStock = { $eq: filterBy.inStock }
    // if (filterBy.inStock) criteria.inStock = { $eq: (filterBy.inStock === 'true') }
    // if (filterBy.labels)
    return criteria
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    addMsg,
}