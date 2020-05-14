/**
 * Import our dependencies.
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
 * Setup our Express application.
 */
const app = express();
const port = 3001;

// Configure the middleware for the Express application.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());
app.use(morgan("tiny"));

/**
 * Define our API routes.
 */
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

  // Let's generate our image and order the rgb values to our liking.
  try {
    // Generate an array of all the colours in the 15 bit high colour space.
    let colours = generate15BitColours();

    // Determine our ordering method.
    switch (orderingMethod) {
      case "hue":
        colours = sortByHSL(colours, 0);
        break;
      case "luminesce":
        colours = sortByHSL(colours, 2);
        break;
      case "saturation":
        colours = sortByHSL(colours, 1);
        break;
      case "noise":
        colours = fisherYatesShuffle(colours);
        break;
      default:
        break;
    }

    // Set our response type.
    response.type("image/png");

    // Using the sharp library, flatten our array of rgb values,
    // shape our image to the correct dimensions, encode as .png,
    // and pipe the response back to the client.
    return sharp(Buffer.from([].concat.apply([], colours)), {
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
