// need to define the path to plugin based on where it is called 
// so in this case is app.ts and from there path to plugins needs 
// to have './plugins/pluginName.js'
export const pluginsList = [
    "./plugins/env.js",
    "./plugins/cors.js",
    "./plugins/jwt.js",
    "./plugins/mongodb.js",
  ];