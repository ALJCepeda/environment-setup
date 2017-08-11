const handlebars = require('handlebars');
const yaml = require('js-yaml');
const fs = require('fs');
const glob = require('glob');

try {
  if(!fs.existsSync('./dist')) {
    fs.mkdirSync('./dist');
  }

  fs.readFile('./config.yml', 'utf8', (err, fileContents) => {
    if(err) throw err;

    const config = yaml.safeLoad(fileContents);
    glob('./templates/git.tpl', (err, filenames) => {
      if(err) throw err;

      filenames.forEach((filename) => {
        fs.readFile(filename, 'utf8', (err, globContents) => {
          if(err) throw err;

          const template = handlebars.compile(globContents);
          const renderedContent = template(config);
          const distPath = filename.replace('/templates/', '/dist/')
                                   .replace('.tpl', '.yml');

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
