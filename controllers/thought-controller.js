const { Thought, User } = require('../models');


const thoughtController = {
    // get all thoughts
    getAllThought(req, res) {
      Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },
  
    // get one thought by id
    getThoughtById({ params }, res) {
      Thought.findOne({ _id: params.id })
        .then(dbThoughtData => {
          // If no thought is found, send 404
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },
    // create thought
    createThought({ body }, res) {
      Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { username: body.username },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.status(400).json(err));
    },
    // update thought by id
    updateThought({ params, body }, res) {
      Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
    },
    // delete thought
    deleteThought({ params }, res) {
      Thought.findOneAndDelete({ _id: params.id })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },
  
  // create reaction
  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        {$addToSet: { reactions: body } },
        )
    .then(dbAthoughtData => res.json(dbAthoughtData))
    .catch(err => res.status(400).json(err));
  },

  //delete reaction
  deleteReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        {$pull: { reactions:{ reactionId: params.reactionId} } },
        {new: true}
        )
    .then(dbAthoughtData => res.json(dbAthoughtData))
    .catch(err => res.json(err));
  },
}
  module.exports = thoughtController;
