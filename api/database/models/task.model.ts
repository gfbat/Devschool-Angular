const mongoose = require('mongoose');
import { Schema, model, connect } from 'mongoose';

interface Task {
    title: string;
    _listId: Object;
    date: Date;
  }

const TaskSchema = new Schema<Task>({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    _listId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        required: true,
    }
});

const Task = model<Task>('Task', TaskSchema);

module.exports = { Task }