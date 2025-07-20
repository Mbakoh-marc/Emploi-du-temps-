const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/classes', require('./routes/classes'));
app.use('/api/matieres', require('./routes/matieres'));
app.use('/api/salles', require('./routes/salles'));
app.use('/api/cours', require('./routes/cours'));

app.listen(3000, () => {
    console.log('✅ Serveur JSON lancé sur http://localhost:3000');
});
