const express = require('express');
const router = express.Router();
const { getData, saveData } = require('../utils');

const FILE = 'matieres.json';

router.get('/', async (req, res) => {
    const data = await getData(FILE);
    res.json(data);
});

router.post('/', async (req, res) => {
    const data = await getData(FILE);
    const newItem = { id: Date.now(), ...req.body };
    data.push(newItem);
    await saveData(FILE, data);
    res.json(newItem);
});

router.put('/:id', async (req, res) => {
    const data = await getData(FILE);
    const index = data.findIndex(i => i.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Non trouvé' });
    data[index] = { ...data[index], ...req.body };
    await saveData(FILE, data);
    res.json(data[index]);
});

router.delete('/:id', async (req, res) => {
    let data = await getData(FILE);
    data = data.filter(i => i.id != req.params.id);
    await saveData(FILE, data);
    res.json({ message: 'Supprimé' });
});

module.exports = router;

