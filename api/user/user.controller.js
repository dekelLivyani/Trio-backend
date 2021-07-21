const userService = require('./user.service')
const socketService = require('../../services/socket.service')
const logger = require('../../services/logger.service')

async function getUser(req, res) {
   try {
        const user = await userService.getById(req.params.id)
        res.send(user)
    } catch (err) {
        logger.error('Failed to get user', err)
        res.status(500).send({ err: 'Failed to get user' })
    }
}

async function getUsers(req, res) {
    try {
        const filterBy = {
            txt: req.query?.txt ||'',
            minBalance: +req.query?.minBalance || 0
        }
        const users = await userService.query(filterBy)
        res.send(users)
    } catch (err) {
        logger.error('Failed to get users', err)
        res.status(500).send({ err: 'Failed to get users' })
    }
}

async function deleteUser(req, res) {
    try {
        await userService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete user', err)
        res.status(500).send({ err: 'Failed to delete user' })
    }
}

async function updateUser(req, res) {
<<<<<<< HEAD
   try {
       const user = req.body
=======
    try {
        console.log('updateUser');
        const user = req.body
        console.log('userToSave', user);
>>>>>>> be87e358a847f31786aa7b181312718bdf26429f
        const savedUser = await userService.update(user)
        console.log('savedUser', savedUser);
        res.send(savedUser)
<<<<<<< HEAD
        socketService.broadcast({ type: 'user-updated', data: user, to: savedUser._id })
=======
        socketService.emitToUser({ type: 'user-updated', data: savedUser, userId: savedUser._id })
>>>>>>> be87e358a847f31786aa7b181312718bdf26429f
    } catch (err) {
        logger.error('123 Failed to update user', err)
        res.status(500).send({ err: 'Failed to update user' })
    }
}

module.exports = {
    getUser,
    getUsers,
    deleteUser,
    updateUser
}