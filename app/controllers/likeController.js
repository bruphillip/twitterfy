const moongose = require('mongoose');

const Tweet = moongose.model('Tweet');

module.exports = {
  async toogle(req, res, next) {
    try {
      const tweet = await Tweet.findById(req.params.id);
      if (!tweet) {
        return res.status(400).json({ error: 'Tweet doesn\'t exist' });
      }

      const liked = tweet.likes.indexOf(req.UserId);

      if (liked === -1) {
        tweet.likes.push(req.UserId);
      } else {
        tweet.likes.splice(liked, 1);
      }

      await tweet.save();
      return res.json(tweet);
    } catch (err) {
      return next(err);
    }
  },
};
