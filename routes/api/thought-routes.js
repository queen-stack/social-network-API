// import methods from thought-controller file
const router = require('express').Router();

// import methods from the thought-controller
const {
        addThought,
        removeThought,
        addReaction,
        removeReaction
      } = require('../../controllers/thought-controller');      

// ---------------- routes ----------------

//      POST /api/thoughts/<userId>
router
        .route('/:userId').post(addThought);

//      GET for Thought by ID
//      PUT for Reaction /api/thoughts/<userId>/<thoughtId>  
//      DELETE for thought
router
        .route('/:userId/:thoughtId')   // Thought routes
        .put(addReaction)               // Reaction routes, which are within the Thought controller
        .delete(removeThought)          // delete Thought

//      DELETE route Reaction /api/thoughts/<userId>/<thoughtId>/<ReactionID>    
router
        .route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

//export 
module.exports = router;