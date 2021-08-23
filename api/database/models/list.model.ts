const mongoose = require('mongoose');
import { Schema, model, connect } from 'mongoose';

interface List {
    title: string;
  }

const ListSchema = new Schema<List>({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
})

const List = model<List>('List', ListSchema);

module.exports = { List }