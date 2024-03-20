# Bonfires (API)
Bonfires is a simple messaging web app allowing users to start "camps" with one another and send messages in them. This repo hosts the frontend of Bonfires.

## Technologies
- React as the framework
- Vite as the bundler
- Style enforced with ESLint ("Standard with TypeScript" and "Airbnb")

## Routing Checklist
- [x] Site makes a request to `GET /login` on load using stored token, redirects to `/login` if token does not successfully authorize the client.
- [x] `/login`
  - [x] Form that posts to `POST /login`
- [x] `/signup`
  - [x] Form that posts to `POST /signup`
- [x] `/`
  - [x] Makes a request to `GET /channels` on load ("Your channels" section)
  - [x] Form that posts to `POST /channels` ("New channel" button)
- [x] `/channel/:channel`
  - [x] Makes a request to `GET /channel/:channel` on load
  - [x] Form that posts to `POST /channel/:channel/messages` ("Send message" section)
  - [ ] Component that makes a request to `GET /channel/:channel/messages` on load ("Messages" section)
  - [x] "Channel settings" modal:
    - [x] Form that posts to `POST /channel/:channel/name` ("Change display name" section)
    - [x] Form that posts to `POST /channel/:channel/invite` ("Invite a user" section)
    - [x] If admin, form that posts to `PUT /channel/:channel` ("Edit channel details" section)
    - [x] If admin, form that posts to `POST /channel/:channel/promote` ("Promote a user" section)
    - [x] If admin, form that posts to `POST /channel/:channel/kick` ("Kick a user" section)
    - [x] Button that posts to `DELETE /channel/:channel` ("Leave channel" button)
