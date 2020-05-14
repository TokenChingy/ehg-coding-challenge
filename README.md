# EHG Coding Challenge: 32,768

## Table of Contents

- [EHG Coding Challenge: 32,768](#ehg-coding-challenge-32768)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
    - [Environment](#environment)
    - [Dependencies](#dependencies)
    - [Development Dependencies](#development-dependencies)
  - [Usage](#usage)
  - [Challenge](#challenge)
    - [Problem](#problem)
    - [Solution](#solution)
      - [Backend](#backend)
      - [Frontend](#frontend)

## Requirements

### Environment

- `Node.JS`
- `NPM`

### Dependencies

- `body-parser`
- `compression`
- `express`
- `morgan`
- `react`
- `react-dom`
- `react-router-dom`
- `react-scripts`
- `sharp`
- `gralig.css`

### Development Dependencies

- `concurrently`
- `nodemon`

## Usage

In the terminal run:

1. `npm install-client && npm install-api`
2. `npm run start`

This should open a browser window showing the web application.

> NOTE: This isn't ready for production, it's using a proxy from frontend to the backend. The frontend is being served by the development server used by `React.JS`.

## Challenge

### Problem

The EHG Coding Challenge required a web application to be built using `React.JS` and `Node.JS`. This web application needed to display a generated, aesthetically pleasing (or interesting) image in which each of the colours within the image occurred exactly once. Colours used in this image were also restricted to the `15 bit high colour space`. This hard requirement meant that in generating the image, the colour space was restricted to only 32768 colours. This restriction meant that there were only 28 possible image image sizes as determined by the divisors of 32768.

### Solution

Initially it was intended to develop the entire application using `React.JS` to fullfil the task at its bare minimum, but there would be some issues with that:

1. Generating an image on the frontend may impact the browser performance heavily, especially if serving to a mobile browser
2. Setting an `<img />` tag allows for users to save the generated image to their device. Where as using the Canvas API to render the image will require additional steps to get it into an `<img />` tag.
3. The implementation does not truly demonstrate the abilities of a Full Stack Developer (although understandably — the role is of a React Developer — it doesn't hurt to demonstrate other skills on-top)

So in the end the solution involved building a small backend (without a database or file-store) to support the frontend by doing all the heavy lifting of generating the image.

#### Backend

The backend component (more of a microservice) is built using `Node.JS` utilizing the `Express.JS` framework, common `ExpresS.JS` middleware, and `Sharp` — an image processing library for `Node.JS`.

Only one route exists in this back-end and that is a `POST` route called `/colours`. This route is responsible for generating the image of correct size and correct ordering as per client request.

The image generation has `O(N^3)` complexity due to the 3 deep nested `for` loops. Generating a random noise from the colours uses the `Fisher Yates Shuffling Algorithm` and is implemented with `O(N)` complexity. The HSL sort algorithms are at the mercy of `Chrome V8s` internal `Array.sort` implementations — believed to be `Tim Sort` which has a worst case complexity of `O(N)`.

Once the image has been generated and ordered, using `Sharp`, the image is shaped into the correct dimensions with 3 channels (since alpha doesn't exist in the `15 bit high colour space`), encoded as a `png` and the piped back into the response to the frontend for consumption as a `blob`.

#### Frontend

The frontend is implemented using `React.JS`. The core goal of it is to query the backend for a generated image created to specification determined by the user of the web application.

This frontend is has two main components that build up the core functionality.

The first being the `Configurator` component that takes in a specified `height`, `width`, and `ordering`. These values are then saved to a global state in the `React.JS` application using a combination of `hooks`, and `context` APIs to be made available to other components. Using the `hooks` in combination with `context` APIs was far less complicated than setting up a `Redux` store.

The second component is the `GeneratedImage` component. This component takes the image parameters and on an effect (`useEffect` hook), will query the backend using `fetch` through a `POST` request and await the response. Once the response is received and it's determined that it is a `blob`, an `<img />` is updated with a local `url` to the blob and the result is rendered to the user.

Apart from the two core components that make up the frontend, there are auxillary components that were built to style the web application to provide a more pleasant UI/UX. These components encompass:

- Routing for SPAs
- The use of layouts and pages with nested routing
