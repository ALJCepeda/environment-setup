const handlebars = require('handlebars');
const yaml = require('js-yaml');
const fs = require('fs');
const glob = require('glob');

handlebars.registerHelper('unlessContains', (elem, list, options) => {
  if(list.indexOf) {
    if(list.indexOf(elem) > -1) {
      return options.inverse(this);
    }

    return options.fn(this);
  } else {
    if(list[elem]) {
      return options.inverse(this);
    }

    return options.fn(this);
  }
});

try {
  if(!fs.existsSync('./dist')) {
    fs.mkdirSync('./dist');
  }

  fs.readFile('./config.yml', 'utf8', (err, fileContents) => {
    if(err) throw err;

    const config = yaml.safeLoad(fileContents);
    glob('./templates/*', (err, filenames) => {
      if(err) throw err;
      if(filenames.length === 0) throw new Error(`No matching template for pattern ${pattern}`);

      filenames.forEach((filename) => {
        fs.readFile(filename, 'utf8', (err, globContents) => {
          if(err) throw err;

          const template = handlebars.compile(globContents);
          const renderedContent = template(config);
          const distPath = filename.replace('/templates/', '/dist/')

          fs.writeFile(distPath, renderedContent,  'utf8', (err) => {
            if(err) throw err;
          });
        });
      });
    });
  });
} catch(e) {
  console.log(e);
}
