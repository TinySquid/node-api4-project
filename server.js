const express = require("express");
const uuid = require('uuid/v4');
const jwt = require('jwt-simple');

const cors = require("corswwwww");

const app = express();

//Normally would be in process.env
const secret = Buffer.from('fe1a1915a379f3be5394b64d14794932', 'hex');

app.use(bodyParser.json());
app.use(cors());

let users = [
  {
    username: 'admin',
    password: 'unsecure',
    isLoggedIn: false,
    token: ''
  }
]

let colors = [
  {
    color: "aliceblue",
    code: {
      hex: "#f0f8ff"
    },
    id: 1
  },
  {
    color: "limegreen",
    code: {
      hex: "#99ddbc"
    },
    id: 2
  },
  {
    color: "aqua",
    code: {
      hex: "#00ffff"
    },
    id: 3
  },
  {
    color: "aquamarine",
    code: {
      hex: "#7fffd4"
    },
    id: 4
  },
  {
    color: "lilac",
    code: {
      hex: "#9a99dd"
    },
    id: 5
  },
  {
    color: "softpink",
    code: {
      hex: "#dd99ba"
    },
    id: 6
  },
  {
    color: "bisque",
    code: {
      hex: "#dd9a99"
    },
    id: 7
  },
  {
    color: "softyellow",
    code: {
      hex: "#dcdd99"
    },
    id: 8
  },
  {
    color: "blanchedalmond",
    code: {
      hex: "#ffebcd"
    },
    id: 9
  },
  {
    color: "blue",
    code: {
      hex: "#6093ca"
    },
    id: 10
  },
  {
    color: "blueviolet",
    code: {
      hex: "#8a2be2"
    },
    id: 11
  }
];

let nextId = 12;

function authenticator(req, res, next) {
  const { authorization } = req.headers;

  const decodedJwt = jwt.decode(authorization, secret)

  if (users[decodedJwt.id].token === decodedJwt.token) {
    next();
  } else {
    res.status(403).json({ error: "User must be logged in to do that." });
  }
}

app.post('/api/validate', (req, res) => {
  const { token } = req.body;

  const decodedJwt = jwt.decode(token, secret)

  if (users[decodedJwt.id].token === decodedJwt.token) {
    res.status(200).json({ isAuthenticated: true });
  } else {
    res.status(403).json({ error: "User must be logged in to do that." });
  }
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const userId = users.findIndex(user => user.username === username && user.password === password);

  if (userId !== -1) {
    const newToken = uuid();
    const encodedToken = jwt.encode({ id: userId, token: newToken }, secret);
    users[userId] = { ...users[userId], isLoggedIn: true, token: newToken }
    setTimeout(() => {
      res.status(200).json({
        token: encodedToken,
        isLoggedIn: true
      });
    }, 100);
  } else {
    res
      .status(403)
      .json({ error: "Username or Password incorrect. Please see Readme" });
  }
});

app.get("/api/colors", authenticator, (req, res) => {
  res.send(colors);
});

app.post("/api/colors", authenticator, (req, res) => {
  if (req.body.color !== undefined && req.body.code !== undefined) {
    const newcolor = req.body;
    newcolor.id = nextId;
    colors.push(newcolor);
  }
  nextId = nextId + 1;
  res.status(201).json(colors);
});

app.put("/api/colors/:id", authenticator, (req, res) => {
  if (!req.params.id)
    res.status(400).send("Your request is missing the color id");
  if (req.body.id === undefined || !req.body.color || !req.body.code) {
    res
      .status(422)
      .send("Make sure your request body has all the fields it needs");
  }
  colors = colors.map(color => {
    if (`${color.id}` === req.params.id) {
      return req.body;
    }
    return color;
  });
  res.status(200).send(req.body);
});

app.delete("/api/colors/:id", authenticator, (req, res) => {
  if (!req.params.id)
    res.status(400).send("Your request is missing the color id");
  colors = colors.filter(color => `${color.id}` !== req.params.id);
  res.status(202).send(req.params.id);
});

app.get("/", function (req, res) {
  res.send("App is working 👍");
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});