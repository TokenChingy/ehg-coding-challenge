/**
 * Takes an RGB array and converts it to HSL.
 */
const rgbToHsl = (colour) => {
  // Convert our RGB channel values into values between 0 and 1.
  const r = colour[0] / 255;
  const g = colour[1] / 255;
  const b = colour[2] / 255;

  // Determine the minimum and maximum values for our RGB channels.
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h;
  let s;

  // Work out the luminance value, by summing our min and max then dividing the sum
  // by 2.
  let l = (max + min) / 2;

  // Determine our saturation.
  // If our min and max values are the same, we have no saturation.
  // else we need to select the correct saturation formula.
  if (max == min) {
    h = s = 0;
  } else {
    // Determine our distance.
    const d = max - min;

    // Choose our saturation formula based on luminesce being > || < 0.5.
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    // Dependant on channel, calculate hue.
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  // Return HSL array with the hue converted to degrees.
  return new Array(h * 360, s * 100, l * 100);
};

/**
 * Sort the colours by hue.
 */
const sortByHSL = (array, channel) => {
  return array
    .map((colour, i) => {
      return { colour: rgbToHsl(colour), index: i };
    })
    .sort((colour1, colour2) => {
      return colour1.colour[channel] - colour2.colour[channel];
    })
    .map((data) => {
      return array[data.index];
    });
};

/**
 * The classic and famous Fisher Yates Shuffle. This will shuffle
 * the array in place to produce a randomized sequence.
 */
const fisherYatesShuffle = (array) => {
  // Define our starting position and temporary elements.
  let remainingElement = array.length,
    elementToSwap,
    currentElement;

  // Begin shuffling in-place, until no more elements to shuffle.
  while (remainingElement) {
    // Pick a remaining element.
    elementToSwap = Math.floor(Math.random() * remainingElement--);

    // And swap it with the current element.
    currentElement = array[remainingElement];
    array[remainingElement] = array[elementToSwap];
    array[elementToSwap] = currentElement;
  }

  // Return the array.
  return array;
};

/**
 * Function to return all the 15 bit high colours in an array.
 */
const generate15BitColours = () => {
  // Our array to store 32768 colours.
  const colours = new Array(32768);

  // Counter for the current colour.
  let colour = 0;

  // Our colour channel intensities.
  let blueChannel = 0;
  let redChannel = 0;
  let greenChannel = 0;

  // Generate the intensities for each channel in increments of 8.
  // The complexity of this is O(N^3), flattening this triple for loop would decrease complexity.
  // TODO: Flatten the loops.
  for (let i = 0; i < 32; i++) {
    // Increment our red channel intensity.
    redChannel += 8;

    for (let j = 0; j < 32; j++) {
      // Increment our green channel intensity.
      greenChannel += 8;

      for (let k = 0; k < 32; k++) {
        // Increment our blue channel intensity.
        blueChannel += 8;

        // Assign the colour to the array of colours.
        colours[colour] = [redChannel - 1, greenChannel - 1, blueChannel - 1];

        // Increment the colour counter.
        colour++;
      }

      // Reset our blue channel intensity once we reach 256.
      blueChannel = 0;
    }

    // Reset our green channel intensity once we reach 256.
    greenChannel = 0;
  }

  // We don't need to reset our red channel intensity as we have all 32768 colours.
  // Return a flattened Buffer.
  return colours;
};

/**
 * Export our functions.
 */
module.exports = {
  generate15BitColours,
  fisherYatesShuffle,
  sortByHSL,
};
