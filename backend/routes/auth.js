const { check } = require('express-validator');
const { register, login } = require('../controllers/auth');
const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/UserModel');

router.post('/register', [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
], register);

router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
], login);

// Route to get user details
router.get('/user/details', authMiddleware, async (req, res) => {
    try {
        // Find user details based on req.user.id set by authMiddleware
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user details:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
