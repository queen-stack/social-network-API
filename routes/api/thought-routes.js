// import methods from thought-controller file
const router = require('express').Router();

// import methods from the thought-controller
const {
    addThought,
    removeThought,
    addReaction,
    removeReaction
}  =require('../../controllers/thought-controller');
    
const { route } = require('./user-routes');

// ---------------- routes ----------------
// router  
//     .route('/')
//     .get(getAllThoughts)
//     .get(getThoughtById);

router
    .route('/:userId').post(addThought);

router
        .route('/:userId/:thoughtId')   // Thought routes
        // .put(updateThought)
        .put(addReaction)               // Reaction routes, which are within the Thought controller
        .delete(removeThought)          // delete Thought

router
    .route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

//export 
module.exports = router;