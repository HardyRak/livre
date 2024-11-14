const express = require('express');
const router = express.Router();

const livreService = require('../services/livreService');

router.get('/livre', async (req, res) => {
    try {
        const limit = 5;
        const page = parseInt(req.query.page) || 1;
        const order = req.query.order
        const orderType=parseInt(req.query.orderType);
        const { books, totalItems } = await livreService.getBooks(page, limit, order, orderType);
        res.status(200).json({
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page,
            books
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/livre/:id', async (req, res) => {
    try {
        const livre = await livreService.getLivreById(req.params.id);
        if (livre) {
            res.status(200).json(livre);
        } else {
            res.status(404).json({ message: 'Livre non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/livre', async (req, res) => {
    try {
        await livreService.createLivre(req.body);
        const totalPage= await livreService.getTotalPages(5);
        res.status(201).json({
            totalPage: totalPage
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/livre/:id', async (req, res) => {
    try {
        const livre = await livreService.deleteLivre(req.params.id);
        if (!livre) {
            return res.status(404).json({ message: "Livre non trouvé" });
        }
        res.status(201).json({message : "suppression"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;