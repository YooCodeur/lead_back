const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db'); // Importer la connexion à MongoDB depuis db.js
const User = require('./models/User'); // Importer le modèle User

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Route pour recevoir les données du formulaire
app.post('/api/form-submit', (req, res) => {
  const formData = req.body;
  console.log('Form Data Received:', formData);

  // Créer une nouvelle instance de User avec les données du formulaire
  const newUser = new User({
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phone: formData.phone,
    address: formData.address,
    ownershipStatus: formData.ownershipStatus,
    heatingCount: formData.heatingCount
  });

  // Sauvegarder l'utilisateur dans la base de données MongoDB
  newUser.save()
    .then(() => {
      console.log('Utilisateur enregistré avec succès');
      res.json({ message: 'Données reçues et enregistrées avec succès!' });
    })
    .catch(err => {
      console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', err);
      res.status(500).json({ error: 'Erreur serveur lors de l\'enregistrement des données' });
    });
});

app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur le port ${PORT}`);
});
