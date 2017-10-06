const handlebars = require('handlebars');
const yaml = require('js-yaml');
const fs = require('fs');

require('./handlebar-helpers.js')(handlebars);

const Modeler = require('./modeler.js');
const modeler = new Modeler();

const Renderer = require('./renderer.js');
const renderer = new Renderer(handlebars, modeler);

try {
  if(!fs.existsSync('./dist')) {
    fs.mkdirSync('./dist');
  }

  fs.readFile('./config.yml', 'utf8', (err, fileContents) => {
    if(err) throw err;

    const config = yaml.safeLoad(fileContents);
    const ansibleModel = modeler.buildAnsibleModel(config);

    renderer.renderAnsibleModel(ansibleModel);
  });
} catch(e) {
  console.log(e);
}
