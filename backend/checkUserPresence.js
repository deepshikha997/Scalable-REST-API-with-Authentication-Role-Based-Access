const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const user = await User.findOne({ email: 'test@test.com' });
    if (!user) {
      console.log('User not found.');
    } else {
      console.log('Found user:', {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
      });
    }
  } catch (err) {
    console.error('DB check error:', err.message);
  } finally {
    await mongoose.disconnect();
  }
})();