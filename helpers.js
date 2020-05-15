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
  // Create an array of 32768 values, we're using bitwise ops as
  // it'll allow Chrome V8 to optimise.
  const colours = new Array(1 << 15);

  // Create our multidimensional array.
  for (let i = 0; i < 1 << 15; i++) {
    colours[i] = new Array(3);
  }

  // Lets shift our way into the colours we want.
  for (let i = 0; i < 1 << 15; i++) {
    const r = (i & ((1 << 5) - 1)) * 8 + 7;
    const g = ((i >> 5) & ((1 << 5) - 1)) * 8 + 7;
    const b = ((i >> 10) & ((1 << 5) - 1)) * 8 + 7;

    colours[i][0] = r;
    colours[i][1] = g;
    colours[i][2] = b;
  }

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
