# Fullstack Typescript - Frontend Template
A template for a TypeScript frontend. Designed to work with the [Backend Template.](https://github.com/endulum/ts-backend-template)

## Behavior
On page visit, the page makes a request to the server's `GET /login` endpoint using the stored authentication token, if it exists. If there is no token, the response indicates the absence of a token, or that the token is not valid, the page - no matter the current URL - will redirect to `/login`.

Signed-out visitors may only visit the routes under the auth route wrapper, the `/signup` or `/login` routes. Once a visitor signs in through `/login`, the token provided from a successful `POST /login` response will be stored. Signed-in visitors can access any route under the index route wrapper, but will be redirected to `/` upon visiting `/signup` or `/login`.

The index wrapper consists of a header bar and an outlet for main content. The header bar has a button to log the current user out by destroying the stored token. 

There is one dynamic route, `/user/:id`, which fetches the data for the user indicated by `:id` on load. This route contains a modal for a form allowing the user's details to be changed, if the user and the logged-in user is the same.

## Technologies
- React as the framework
- Vite as the bundler
- Style enforced with ESLint ("Standard with TypeScript" and "Airbnb")
