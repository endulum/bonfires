# Bonfires
Bonfires is a simple messaging web app allowing users to start "camps" with one another and send messages in them. This repo hosts the frontend of Bonfires.

🚀 [Live on Vercel](https://bonfires.vercel.app)

[Backend Repo](https://github.com/endulum/bonfires-api)

![Preview of the login screen and the chat interface of a camp in the Bonfires app](https://file.garden/ZUwWpIlFyDFIgXaU/bonfires)

## Technologies
- React as the framework
- Vite as the bundler
- Style enforced with ESLint ("Standard with TypeScript" and "Airbnb")
- Live messaging and typing indication with Socket.io

## Areas of Improvement
- **Refine Project Structure:** Source files should be easily navigable such that they are easy to read, and changes made to the app are seamless and localized. The article [Modularizing React Applications with Established UI Patterns](https://martinfowler.com/articles/modularizing-react-apps.html) demonstrates gzood modularization practice. One ground-up refactor has been made so far, splitting up massive component files into smaller ones and separating logic out into hooks and helpers. This project structure will be revisited in the future once more experience with projects has been gained.
  - On the topic of this article, the `models` folder was not taken advantage of. Only basic interface declaration and casting was used to model fetched data for use in this app.
- **Accessibility Auditing:** No accessibility auditing other than style guide recommendations have been made. Research should be done on how to observe such an app for accessibility concerns.
- **Styling:** The majority of the app's styling is all on one long file, and best styling practices may not have been made. Furthermore, research should be done on which newer, more robust CSS features to employ.
