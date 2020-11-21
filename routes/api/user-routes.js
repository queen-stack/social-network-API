const router = require('express').Router();

// connecting to the routes, implementing controller methods
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/user-controller');

const { update } = require('../../models/User');

// Set up GET all and POST at /api/users

// /api/users
router
  .route('/')
  .get(getAllUser)
  .post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// /api/users/:id/friends/:friendId
router
  .route('/:id/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend);

module.exports = router;
