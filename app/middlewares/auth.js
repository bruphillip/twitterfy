const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const authConfig = require('../../config/auth');


module.exports = async (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const parts = authHeaders.split(' ');

  if (!parts.length === 2) {
    return res.status(401).json({ error: 'Token error' });
  }

  const [scheme, token] = parts;

  if (scheme !== 'Bearer') {
    return res.status(401).json({ error: 'Token malformated' });
  }

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.UserId = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token Invalid' });
  }
};
