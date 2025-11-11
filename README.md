This project is a basic social media application similar to Twitter.
Users can sign up, log in, create posts, comment on posts, view feeds, and see other users.

The backend is built using:

Node.js

Express.js

MongoDB + Mongoose

ESM modules

📂 Project Structure
social-media-twitter/
│
├── controllers/
│   ├── user.controller.js
│   ├── post.controller.js
│   └── comment.controller.js
│
├── models/
│   ├── user.model.js
│   ├── post.model.js
│   └── comment.model.js
│
├── routes/
│   ├── user.routes.js
│   ├── post.routes.js
│   └── comment.routes.js
│
├── config/
│   └── db.js
│
├── server.js
├── package.json
└── .env
