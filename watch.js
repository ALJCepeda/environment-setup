const handlebars = require('handlebars');
const yaml = require('js-yaml');
const fs = require('fs');
const glob = require('glob');
const { exec } = require('child_process');

const files = [
  './templates/*.tpl',
  './config.yml',
  './build.js'
];

const runBuild = function(type, path) {
  if(type === 'change') {
    console.log(`Change: ${path}`);
    exec('node build.js', (err, stdout, stderr) => {
      if(err) throw err;
    
      console.log(`stdout: ${stdout}`);
      if(stderr) {
        console.log(`stderr: ${stderr}`);
      }
    });
  }   
};

const watchFile = function(filename) {
  fs.watch(filename).on('add', runBuild)
                    .on('change', runBuild);

  console.log(`Watching: ${filename}`);
};

const watchGlob = function(pattern) {
  glob(pattern, (err, filesnames) => {
    if(err) throw err;

    filesnames.forEach((filename) => {
      watchFile(filename);
    });
  });
};

files.forEach((filename) => {
  if(filename.indexOf('*') !== -1) {
    watchGlob(filename);
  } else {
    watchFile(filename);
  }
});
