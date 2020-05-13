/*
 * Main Javascript file for atlas.
 *
 * This file bundles all of your javascript together using webpack.
 */

// JavaScript modules

require.context(
  "../img", // context folder
  true, // include subdirectories
  /.*/ // RegExp
);

// Your own code
require("./map.js");
require("./script.js");
