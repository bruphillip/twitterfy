const moongose = require('mongoose');

const User = moongose.model('User');
const Tweet = moongose.model('Tweet');

module.exports = {
  async me(req, res, next) {
    try {
      const user = await User.findById(req.UserId);
      const tweetCount = await Tweet.find({ user: user.id }).count();

      return res.json({
        user,
        tweetCount,
        followersCount: user.followers.length,
        followingCount: user.following.length,
      });
    } catch (err) {
      return next(err);
    }
  },
  async feed(req, res, next) {
    try {
      const user = await User.findById(req.UserId);
      const { following } = user;
      const tweet = await Tweet.find({ user: { $in: [user.id, ...following] } }).limit(50).sort('-createdAt');

      return res.json(tweet);
    } catch (err) {
      return next(err);
    }
  },
  async update(req, res, next) {
    try {
      const id = req.UserId;
      const {
        name,
        username,
        password,
        confirmPassword,
      } = req.body;
      if (password && password !== confirmPassword) {
        return res.status(400).json({ error: 'Password doesn\'t match' });
      }

      const user = await User.findByIdAndUpdate(id, { name, username }, { new: true });
      if (password) {
        user.password = password;
        await user.save();
      }

      return res.json(user);
    } catch (err) {
      return next(err);
    }
  },
};
