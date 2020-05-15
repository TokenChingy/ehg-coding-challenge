/**
 * Import dependencies.
 */
const bodyParser = require("body-parser");
const compression = require("compression");
const express = require("express");
const morgan = require("morgan");
const sharp = require("sharp");

const {
  generate15BitColours,
  fisherYatesShuffle,
  sortByHSL,
} = require("./helpers");

/**
 * Cache the colours generated so we're not wasting processing.
 * While we're at it, let's create a cache for generated images so that
 * of we get the same request for a particular image, we can serve it from
 * this cache.
 */
const colours = generate15BitColours();
const imageCache = {};

/**
 * Setup the Express application.
 */
const app = express();
const port = 3001;

// Configure the middleware for the Express application.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());
app.use(morgan("tiny"));

/**
 * Define the API routes.
 */
// Route to post to with image configurations to then receive back an image.
app.post("/colours", async (request, response) => {
  // Destructure our request body.
  const { imageHeight, imageWidth, orderingMethod } = request.body;

  // Make sure we have an imageHeight and imageWidth.
  if (!imageHeight || !imageWidth) {
    // Log any errors.
    console.error("imageHeight or imageWidth missing.");

    // Return the error to the client.
    return response.send({
      status: "fail",
      reason: "imageHeight or imageWidth missing.",
    });
  }

  // Define a handle for our image data.
  let image;

  // Check if this request has been made before, if it has, grab it
  // from the cache.
  if (imageCache[`${imageHeight}${imageWidth}${orderingMethod}`]) {
    image = imageCache[`${imageHeight}${imageWidth}${orderingMethod}`];
  } else {
    // Nothing in cache? Create a copy of the colours to be manipulated.
    image = [...colours];

    // Determine our ordering method.
    switch (orderingMethod) {
      case "hue":
        image = sortByHSL(image, 0);
        break;
      case "luminesce":
        image = sortByHSL(image, 2);
        break;
      case "saturation":
        image = sortByHSL(image, 1);
        break;
      case "noise":
        image = fisherYatesShuffle(image);
        break;
      default:
        break;
    }
  }

  // Set out response type to png.
  response.type("image/png");

  try {
    // Using the sharp library, flatten our array of rgb values,
    // shape our image to the correct dimensions, encode as .png,
    // and pipe the response back to the client.
    return sharp(Buffer.from([].concat.apply([], image)), {
      raw: {
        width: imageWidth,
        height: imageHeight,
        channels: 3,
      },
    })
      .png()
      .pipe(response);
  } catch (error) {
    // Catch and log any errors.
    console.error(error);

    // Return error to client.
    return response.send({
      status: "fail",
      reason: error,
    });
  }
});

/**
 * Begin listening for requests.
 */
app.listen(port, () =>
  process.stdout.write(
    `EHG Coding Challenge API is listening at http://localhost:${port}\n`
  )
);
