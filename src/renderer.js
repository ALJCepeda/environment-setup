const fs = require('fs');
const glob = require('glob');

const Renderer = function(handlebars, modeler) {
  this.handlebars = handlebars;
  this.modeler = modeler;
};

Renderer.prototype.render = function(path, dist, model) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, content) => {
      if(err) return reject(err);
      const template = this.handlebars.compile(content);
      const rendered = template(model);

      fs.writeFile(dist, rendered,  'utf8', (err) => {
        if(err) return reject(error);

        resolve({ path, dist, model, template, rendered});
      });
    });
  });
};

Renderer.prototype.renderAnsibleModules = function(model) {
  if(!fs.existsSync('./dist/modules')) {
    fs.mkdirSync('./dist/modules');
  }

  const modules = model.modules;
  const playbook = model.playbook;
  const order = [];
  for (const key in modules) {
    const moduleConfig = modules[key];
    const moduleModel = this.modeler.buildModulesModel(key, moduleConfig, playbook);
    const path = `modules/${key}.yml`;

    order.push(path);
    this.render('./templates/modules/module.yml.hbs', `./dist/${path}`, moduleModel);
  }

  return order;
};

Renderer.prototype.renderTemplates = function(ansibleModel) {
  glob('./templates/*.hbs', (err, filenames) => {
    if(err) throw err;
    if(filenames.length === 0) throw new Error(`No matching template for pattern ${pattern}`);

    filenames.forEach((filename) => {
      const distPath = filename.replace('/templates/', '/dist/').replace('.hbs', '');
      this.render(filename, distPath, ansibleModel);
    });
  });
};

Renderer.prototype.renderAnsibleModel = function(ansibleModel) {
  if(typeof ansibleModel.modules !== undefined) {
    ansibleModel.moduleIncludes = this.renderAnsibleModules(ansibleModel);
  }

  this.renderTemplates(ansibleModel);
};

module.exports = Renderer;
