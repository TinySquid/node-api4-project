const router = require('express').Router();

const colorDB = require('./dbColors');

const authenticator = require('../users/authenticator');

//All color routes require authentication.
router.use(authenticator);

router.get("/", (req, res) => {
  const id = req.userId;

  colorDB.getByUserId(id)
    .then(colors => {
      res.status(200).json({
        token: req.token,
        colors: colors
      });
    })
    .catch(error => {
      res.status(500).json({ message: "Could not get colors from database" });
    });
});

//POST api/colors
router.post("/", (req, res) => {
  const { color, code } = req.body;

  if (color && code) {
    colorDB.insert({ color: color, hex: code, user_id: req.userId })
      .then(color => {
        res.status(201).json({
          token: req.token,
          color: color
        });
      })
      .catch(error => {
        res.status(500).json({ message: "Could not add color to the database", error: error });
      });
  } else {
    res.status(400).json({ message: "Please provide color and color code" });
  }
});

// router.put("/colors/:id", (req, res) => {
//   if (!req.params.id)
//     res.status(400).send("Your request is missing the color id");
//   if (req.body.id === undefined || !req.body.color || !req.body.code) {
//     res
//       .status(422)
//       .send("Make sure your request body has all the fields it needs");
//   }
//   colors = colors.map(color => {
//     if (`${color.id}` === req.params.id) {
//       return req.body;
//     }
//     return color;
//   });
//   res.status(200).send(req.body);
// });

// router.delete("/colors/:id", (req, res) => {
//   if (!req.params.id)
//     res.status(400).send("Your request is missing the color id");
//   colors = colors.filter(color => `${color.id}` !== req.params.id);
//   res.status(202).send(req.params.id);
// });

module.exports = router;