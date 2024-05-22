const express = require('express');
const model = require('../model');

const router = express.Router();

router.post('/signin', async (req, res) => {
    const data = new model({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone
    });
    try {
        const uploaddata = await data.save();
        res.status(201).json(uploaddata);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }

});

router.get('/users', async (req, res) => {
    try {
        const data = await model.find();
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        const data = await model.findById(req.params.id);
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.put('/user/update/:id', async (req, res) => {
    try {
        const data = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.delete('/user/delete/:id', async (req, res) => {
    try {
        const data = await model.findByIdAndDelete(req.params.id);
        res.status(200).json("User deleted successfully");
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

module.exports = router;