# 25 + 5 Clock
This is a pomodoro timer created using Create React App with the Redux and Redux Toolkit template. 
You can set the work and break intervals between 1 and 60 minutes. When one interval is complete, and alarm sounds and the next interval is started automatically.
Start/Stop starts and pauses. Reset initializes the clock to its defaults state.
I've left the test suite in the code for now. Feel free to run the tests by selecting the appropriate test from the drop down.

## Why I built this
This my final project for the freeCodeCamp Front End Libraries unit.

## How I built this
I wanted to do code one of my projects using Redux, although I'm not sure that it would really be warranted for an app like this. I did find that once Redux was set up, it made it quite easy to manage the state of the app and to experiment with ways to implement the desired functionality.

One big issue that I had was the manner in which the setInterval function that runs the timer for the clock is called (inside a thunk). I couldn't quite find a way to use clearInterval in a way that worked, so my solution was to just let the timer run once it started and make the timer ignore it when in a stopped state. Maybe not the best way, but it works for now.

### Small bugs

* It's not particularly great looking (or at least not very fancy). I was mainly concerned with the functionality on the first version, as well as this being my first time using Redux. 
* The hover behavior of the buttons causes elements on the screen to shift around.
* I am aware that using setTimeout is not particularly accurate. I will at some point find a better way.

### Future ideas

* A more fully functional clock with a longer break time after a certain number of work intervals.
* It would be neat to try for an analog clock display.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
