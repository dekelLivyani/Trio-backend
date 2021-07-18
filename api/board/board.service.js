const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
   query,
   getById,
   remove,
   update,
   add
}

async function query(filterBy) {
   // const criteria = _buildCriteria(filterBy);
   try {
      const collection = await dbService.getCollection('board')
      const boards = await collection.find().toArray()
      return boards;
   } catch (err) {
      console.log('Beckend - ERROR: cannot get boards')
      throw err
   }
}

async function getById(boardId) {
   try {
      boardId = ObjectId(boardId)
      const collection = await dbService.getCollection('board')
      const board = await collection.findOne({ _id: boardId })
      return board
   } catch (err) {
      console.log(`Beckend - ERROR: cannot get board ${boardId}`)
      throw err
   }
}

async function remove(boardId) {
   try {
      const collection = await dbService.getCollection('board')
      return await collection.deleteOne({ _id: ObjectId(boardId) })
   } catch (err) {
      console.log(`Beckend - ERROR: cannot remove board ${boardId}`)
      throw err
   }
}

async function update(board) {
   try {
      board._id = ObjectId(board._id)
      const collection = await dbService.getCollection('board')
      await collection.updateOne({ _id: board._id }, { $set: { ...board } })
      return board
   } catch (err) {
      console.log(`Beckend - Beckend - ERROR: cannot update board ${board._id}`)
      throw err
   }
}

async function add(board) {
   try {
      const collection = await dbService.getCollection('board')
      await collection.insertOne(board)
      return board
   } catch (err) {
      console.log(`Beckend - ERROR: cannot add board`)
      throw err
   }
}
function _buildCriteria(filterBy) {
   const criteria = {}
   // if (filterBy.txt) {
   //    const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
   //    criteria.txt = txtCriteria
   // }
   // if (filterBy.type && filterBy.type !== 'All') {
   //    criteria.type = filterBy.type
   // }
   // if (filterBy.price) {
   //    criteria.price = { $gte: +filterBy.price }
   // }
   // return criteria
}


