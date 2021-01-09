const Coms = require('../models/Coms');

/* CREATE ONE COM */
exports.createCom = (req, res, next) => {
    delete req.body._id;
    let combody = JSON.parse(req.body.com);
    const com = new Com({
      ...combody
    });
    com.save()
      .then(() => res.status(201).json({ message: 'Commentaire enregistré !'}))
      .catch(error => res.status(400).json({ error }));
};

/* GET ALL COMS*/
exports.getAllComs = (req, res, next) => {
  Com.findAll()
      .then(posts => res.status(200).json(coms))
      .catch(error => res.status(400).json({ error }));
};