/**
 * auth.js
 * Author: Roman Shuvalov
 */
'use strict';

const router = require('express').Router();
const { body } = require('express-validator');
const AuthController = require('../controllers/AuthController');
const verifyToken = require('../middleware/verifyToken');

// Log in an existing user
router.post('/login', [
    body('email')
        .isEmail().withMessage('Incorrect email')
        .notEmpty().withMessage('Email must be not empty'),
    body('password')
        .notEmpty().withMessage('Password must be not empty'),
], AuthController.login);

router.post('/register', [
    body('nickname')
        .notEmpty().withMessage('Nickname must be not empty'),
    body('email')
        .notEmpty().withMessage('Email must be not empty')
        .isEmail().withMessage('Incorrect email'),
    body('password')
        .notEmpty().withMessage('Password must be not empty')
        .isLength({ min: 8 }).withMessage('Password must contain at least 8 characters'),
    body('passwordConfirm')
        .custom((value, { req }) => {
            if(value !== req.body.password) {
                return false
            }

            return true
        }).withMessage('Passwords must match'),
], AuthController.register);

module.exports = router;