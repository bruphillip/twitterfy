const moongose = require('mongoose');

const TweetSchema = new moongose.Schema({
  content: {
    type: String,
    require: true,
    trim: true,
    maxlength: 280,
  },
  user: {
    type: moongose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: [{ type: moongose.Schema.ObjectId, ref: 'User' }],
  createdAt: {
    type: Date,
    dafault: Date.now,
  },
});

moongose.model('Tweet', TweetSchema);
