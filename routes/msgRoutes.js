'use strict';

module.exports = function(app) {

var messages = require('../controllers/msgController');

// messages Routes

app.route('/mdr')

   .get(messages.list_all_messages)


app.route('/transaction')

    .post(messages.create_a_message);

};