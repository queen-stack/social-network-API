// import methods from thought-controller file
const router = require('express').Router();

// import methods from the thought-controller
const {
    getAllThought,
    getThoughtById,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
}  = require('../../controllers/thought-controller');
    
const { route } = require('./user-routes');

// ---------------- routes ----------------
router  
    .route('/')
    .get(getAllThought)
    .post(addThought)

router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought)

router   
    .route('/:thoughtId/reactions')
    .post(addReaction)

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction)
       
//export 
module.exports = router;