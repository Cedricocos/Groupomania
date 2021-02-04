const Coms = require('../models/Coms');

/* CREATE ONE COM */
exports.createCom = (req, res, next) => {
  // console.log(req.body);
  let combody = req.body.com;
  const com = new Coms({
    ...combody
  });
  com.save()
    .then(() => res.status(201).json({ message: 'Commentaire enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};

// /* GET ALL COMS*/
// exports.getAllComsByPostId = (req, res, next) => {
//   console.log(Coms);
//   Coms.findAll({
//     where: { postId: req.params.id },
//     order: [["createdAt", "DESC"]]
//   })
//     .then(coms => res.status(200).json(coms))
//     .catch(error => res.status(400).json({ error }));
// };