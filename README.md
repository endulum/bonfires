# Bonfires

Bonfires is a messaging app with a toasty, cozy flavor.

This is the frontend repo. See the [repo for the API here](https://github.com/endulum/bonfires-api).

### Feature rundown

- Create accounts using traditional username or password, or quickly authenticate using an existing GitHub account
- Start private groupchats, called "camps", invite others to camps by username, and share messages in camps
- Upload custom user and camp avatars
- Customize user display name, name color, and activity invisibility both as broad default and per camp
- Camps have activity indicators that show which users are viewing the camp and typing a message
- Toggleable light and dark mode, with preference remembered

### Tech rundown

- **Language:** Typescript
- **Framework:** Express.js on backend, React on frontend
- **Database:** MongoDB with Mongoose ORM
- **Testing:** Jest
- **Other:** JSON Web Token, Socket.IO, Supabase API, GitHub Apps API, Redis, Docker

[Project Spec](https://www.theodinproject.com/lessons/nodejs-messaging-app)

[Live Deployment](https://bonfires.up.railway.app)

![Bonfires channel overview and messaging view.](https://github.com/endulum/bonfires/blob/main/screenshot.png)

### Installation

This is a Node.js project, so you will need Node installed.

This repo hosts a frontend that interacts with the [Bonfires API](https://github.com/endulum/bonfires-api). It will need to be installed and running on a port.

Navigate to the root directory where you'd like this project to be, and clone this repo:

```sh
git clone https://github.com/endulum/bonfires
```

Navigate to the root of the newly created `/bonfires`, and install all required packages:

```sh
npm install
```

### Integrations and environment

This project uses two env files: `development` and `production`. This project supplies a file `.env.example` with the variables necessary to run; copy this file to the two envs specified.

```sh
cp -n .env.example .env.development && cp -n .env.example .env.production
```

This frontend uses very few variables:

- `VITE_APP_NAME`: A string representing the name of this app, set to `Bonfires` by default.
- `VITE_API_URL`: You should have the [Bonfires API](https://github.com/endulum/bonfires-api) up and running somewhere; this var represents the API's URL.
- `VITE_GH_CLIENT_ID`: If you've connected a GitHub App to the Bonfires API, you should add its client ID here, too.

### Graphics acknowledgements

Background pattern is ["Bonfire" from DinPattern](https://dinpattern.com/2014/01/03/bonfire/).

Animal SVGs used to autogenerate new user avatars are from the [Animals 15 collection on SVGRepo](https://www.svgrepo.com/collection/animals-15/).

UI colors are borrowed from [Rosé Pine](https://rosepinetheme.com/).
