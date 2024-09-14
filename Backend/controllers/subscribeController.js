// controllers/subscribeController.js
const Subscriber = require('../models/Subscribe');

const handleSubscribe = async (req, res) => {
  const { email } = req.body;

  if (!email || !validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  try {
    // Check if the email is already subscribed
    let subscriber = await Subscriber.findOne({ email });
    if (subscriber) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }

    // Save new subscriber
    subscriber = new Subscriber({ email });
    const savedSubscriber = await subscriber.save();

    // Use 'savedSubscriber' if needed
    console.log('Subscriber saved:', savedSubscriber);

    res.status(200).json({ message: 'Subscription successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

module.exports = {
  handleSubscribe
};
