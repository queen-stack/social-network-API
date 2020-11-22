//import models needed
const { Thought, User } = require('../models');

// create object

const thoughtController = {
  // Return all the thoughts in the database, most recent first.
  getAllThought({ params }, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })  // sort most recent first
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // add Thought to User, return a User Promise
  addThought({ body }, res) {
    console.log(body);
    Thought.create(body)
      .then(({ _id }) => {
        console.log(body);
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } }, // Add the thought to the User's thoughts list
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // Update the contents of a Thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      body,
      { new: true }
    )
      .then(dbThoughtData => {  // TBD - should this really be the thought data?
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this Id' });
          return;
        }
        res.json(dbThoughtData);
      })
  },

  // remove Thought, remove Thought & remove Thought ID from its User 
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought with this id.' });
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  // add Reaction method resides within the thoughtController, 
  // note: new reactions are NOT adding, are Updating an existing Thought
  addReaction({ params, body }, res) {
    console.log(params);
    console.log(body);
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  // remove Reaction with $pull operator
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
  }
};

module.exports = thoughtController;