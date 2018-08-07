const moongose = require('mongoose');

const User = moongose.model('User');

module.exports = {
  async create(req, res, next) {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(400).json({ error: 'User doesn\'t exist' });
      }

      if (user.followers.indexOf(req.UserId) !== -1) {
        return res.status(400).json({ error: `You are already following ${user.username}` });
      }

      user.followers.push(req.UserId);
      await user.save();

      const me = await User.findById(req.UserId);
      me.following.push(user.id);
      await me.save();

      return res.json(me);
    } catch (err) {
      return next(err);
    }
  },
  async destroy(req, res, next) {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(400).json({ error: 'User doesn\'t exist' });
      }

      const following = user.followers.indexOf(req.UserId);

      if (following === -1) {
        return res.status(400).json({ error: `You aren't following ${user.username}` });
      }


      user.followers.splice(following, 1);
      await user.save();

      const me = await User.findById(req.UserId);
      me.following.splice(me.following.indexOf(user.id), 1);
      await me.save();

      return res.json(me);
    } catch (err) {
      return next(err);
    }
  },
};
