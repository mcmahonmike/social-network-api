const { Schema, model } = require('mongoose');


const ThoughtSchema = new Schema({
    thoughtText: {

    },
    createdAt: {

    },
    username: {

    },
    reactions: {

    }

});

const ReactionSchema = new Schema({
    reactionId: {

    },
    reactionBody: {

    },
    username: {

    },
    createdAt: {

    }
});

const Thought = model('Thought', ThoughtSchema)

module.exports = Thought;