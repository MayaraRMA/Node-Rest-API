'use strict';

let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let msgSchema = new Schema({

   title: {

      type: String
   },

   body: {

      type: String

   },

   Created_date: {

      type: Date,

      default: Date.now

   }

});

module.exports = mongoose.model('Messages', msgSchema);