const boardService = require('./board.service')
const socketService = require('../../services/socket.service')
const logger = require('../../services/logger.service')

async function getBoard(req, res) {
   try {
      const board = await boardService.getById(req.params.id)
      res.send(board)
   } catch (err) {
      logger.error('Failed to get board', err)
      res.status(500).send({ err: 'Failed to get board' })
   }
}

async function getBoards(req, res) {
   try {
      // const filterBy = {
      //    name: req.query?.name || '',
      //    price: req.query?.price || 0,
      //    type: req.query?.type || 'ALL',
      // }
      const boards = await boardService.query()
      res.send(boards)
   } catch (err) {
      logger.error('Failed to get boards', err)
      res.status(500).send({ err: 'Failed to get boards' })
   }
}

async function deleteBoard(req, res) {
   try {
      await boardService.remove(req.params.id)
      res.send({ msg: 'Deleted successfully' })
   } catch (err) {
      logger.error('Failed to delete board', err)
      res.status(500).send({ err: 'Failed to delete board' })
   }
}

async function updateBoard(req, res) {
   try {
      const board = req.body
      const savedBoard = await boardService.update(board)
      res.send(savedBoard)
      // socketService.broadcast({ type: 'board-updated', data: review, to: savedBoard._id })
   } catch (err) {
      logger.error('Failed to update board', err)
      res.status(500).send({ err: 'Failed to update board' })
   }
}

async function addBoard(req, res) {
   try {
      console.log('yes');
      const board = req.body
      const savedBoard = await boardService.add(board)
      res.send(savedBoard)
      // socketService.broadcast({ type: 'board-add', data: review, to: savedBoard._id })
   } catch (err) {
      logger.error('Failed to add board', err)
      res.status(500).send({ err: 'Failed to add board' })
   }
}


module.exports = {
   getBoard,
   getBoards,
   deleteBoard,
   updateBoard,
   addBoard,
}