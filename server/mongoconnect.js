const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/todo-app-db', { useNewUrlParser: true, useUnifiedTopology: true })  