// add  Types object to import ObjectID() value from the _id field
const { Schema, model, Types } = require('mongoose');
const moment = require('moment');


const ReactionSchema = new Schema(
    {
     // add a new customized id, different from its parent Thought _id
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280
      },
      userName: {
        type: String,
        required: true,
        trim: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
      }
    }
  );

const ThoughtSchema = new Schema(
      {
        thoughtText: {
          type: String,
          required: true,
          minlength:1,      // criteria
          maxlength: 280    // criteria 
        },
        createdAt: {
          type: Date,
          default: Date.now,
           // add getters to format the date through a Moment method
          get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        userName: {   
            type: String,
            required: true
          },
        reactions: [ReactionSchema]
      },
        // Virtual added, which is separated from grouping
      // this Virtual is for count of friends
      {
        toJSON: {
          virtuals: true,  // (2) virtual set to true
          getters: true   // work with moment.js, date formatter Getter as per above
        },
        id: false
      }   
 );

// (1) virtual definition to add Reaction count
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});


// create Thought model using Thoughtschema
const Thought = model('Thought', ThoughtSchema);
// export the Thought model
module.exports = Thought;