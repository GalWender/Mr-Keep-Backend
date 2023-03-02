// const logger = require('./logger.service')
// // const contactService = require('../api/board/contact.service')

// var gIo = null

// function setupSocketAPI(http) {
//     gIo = require('socket.io')(http, {
//         cors: {
//             origin: '*',
//         }
//     })
//     gIo.on('connection', socket => {
//         logger.info(`New connected socket [id: ${socket.id}]`)
//         socket.on('disconnect', () => {
//             logger.info(`Socket disconnected [id: ${socket.id}]`)
//         })

//         socket.on('contact-set-channel', channel => {
//             if (socket.contactChannel === channel) return
//             if (socket.contactChannel) {
//                 socket.leave(socket.contactChannel)
//                 logger.info(`Socket is leaving channel ${socket.contactChannel} [id: ${socket.id}]`)
//             }
//             socket.join(channel)
//             socket.contactChannel = channel
//             logger.debug(`Socket is joining channel ${socket.contactChannel} [id: ${socket.id}]`)
//         })
//         socket.on('contact-send-changes', contact => {
//             logger.info(`Contact changes from socket [id: ${socket.id}], emitting to topic ${socket.contactChannel}`)
//             gIo.to(socket.contactChannel).emit('contact-add-changes', contact)
//         })

//         socket.on('set-user-socket', userId => {
//             logger.info(`Setting socket.userId = ${userId} for socket [id: ${socket.id}]`)
//             socket.userId = userId
//         })
//         socket.on('unset-user-socket', () => {
//             logger.info(`Removing socket.userId for socket [id: ${socket.id}]`)
//             delete socket.userId
//         })

//     })
// }

// function emitTo({ type, data, label }) {
//     if (label) gIo.to('watching:' + label.toString()).emit(type, data)
//     else gIo.emit(type, data)
// }

// async function emitToUser({ type, data, userId }) {
//     userId = userId?.toString()
//     const socket = await _getUserSocket(userId)

//     if (socket) {
//         logger.info(`Emiting event: ${type} to user: ${userId} socket [id: ${socket.id}]`)
//         socket.emit(type, data)
//     } else {
//         logger.info(`No active socket for user: ${userId}`)
//     }
// }

// async function broadcast({ type, data, room = null, userId }) {
//     userId = userId?.toString()

//     logger.info(`Broadcasting event: ${type}`)
//     const excludedSocket = await _getUserSocket(userId)
//     if (room && excludedSocket) {
//         logger.info(`Broadcast to room ${room} excluding user: ${userId}`)
//         excludedSocket.broadcast.to(room).emit(type, data)
//     } else if (excludedSocket) {
//         logger.info(`Broadcast to all excluding user: ${userId}`)
//         excludedSocket.broadcast.emit(type, data)
//     } else if (room) {
//         logger.info(`Emit to room: ${room}`)
//         gIo.to(room).emit(type, data)
//     } else {
//         logger.info(`Emit to all`)
//         gIo.emit(type, data)
//     }
// }

// async function _getUserSocket(userId) {
//     const sockets = await _getAllSockets()
//     const socket = sockets.find(s => s.userId === userId)
//     return socket
// }

// async function _getAllSockets() {
//     const sockets = await gIo.fetchSockets()
//     return sockets
// }

// function _printSocket(socket) {
//     console.log(`Socket - socketId: ${socket.id} userId: ${socket.userId}`)
// }

// async function _printSockets() {
//     const sockets = await _getAllSockets()
//     console.log(`Sockets: (count: ${sockets.length}):`)
//     sockets.forEach(_printSocket)
// }

// module.exports = {
//     // set up the sockets service and define the API
//     setupSocketAPI,
//     // emit to everyone / everyone in a specific room (label)
//     emitTo,
//     // emit to a specific user (if currently active in system)
//     emitToUser,
//     // Send to all sockets BUT not the current socket - if found
//     // (otherwise broadcast to a room / to all)
//     broadcast,
// }
