# React Interactive Menu

This a demo React app implementing some of the functionalities of an online interactive menu.

The source code of the project is contained in the current GitHub repository.

The current build version is hosted on [https://react-interactive-menu.web.app](https://react-interactive-menu.web.app).

Implementation details are discussed in the current README.md file.

## Implementation Details

This project uses React + Vite. This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

The project communicates with a backend which is hosted on Google Firebase. The backend provides REST APIs which allow user authentication and database access. The structure of the backend is not part of the project, and it is used as is.

This project might look like a small simple project, but the codebase actually has a high coverage of the most used React concepts and additional libraries. All the components and functions are written as functional (in the most possible declarative way) as possible.

React Router is used for the client-side routing of the application.

Tanstack Query is used for managing the queries to the database. This is a Powerful asynchronous state management for JS and React. It allows the possibility to cache responses, which is reducing the number of requests sent to the database. This also improves the user experience since the ser will not wait for a second response for the same query when navigating the application.

For the user authentication the standard fetch approach is used since no caching is required. The user token and its expiration time are saved in the Local Storage of the browser. This allows the React Router to load the current token in a constant time. However, the useEffect hook is used to set a timer which will automatically logout the user when the token expires.

The application implements cart functionality with the use of Redux Toolkit which is used for store setup, creating reducers and immutable update logic. Redux also reduces the written code by giving the unique option to write "mutative" immutable update logic.

Framer Motion is used as an animation library. It is a production-ready library for React. One of its advantages over the regular CSS animation is the ability to easily set animation on the element disappearance.

For styling of the React components, the CSS Modules build process is used.

## Additional Information

All the images used are taken from [Pexels](https://www.pexels.com) and they are supposed to be royalty free images.

This course projects was developed taking into account the lectures from the course [React - The Complete Guide 2024 (incl. React Router & Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux) created by [Academind by Maximilian Schwarzmüller](https://www.udemy.com/user/academind).
