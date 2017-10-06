const Modeler = function() {
  this.playbookModelKeys = new Set([ 'hosts', 'remote_user', 'become' ]);
  this.moduleMetaKeys = new Set([ 'module', 'taskName']);
  this.includeOrder = [
    'users.yml',
    'apt.yml',
    'git.yml',
    'samba.yml'
  ];
};

Modeler.prototype.buildAnsibleModel = function(model) {
  const playbook = {};
  const tasks = {};
  const modules = model.modules;

  for(let key in model) {
    if(this.playbookModelKeys.has(key)) {
      playbook[key] = model[key];
    } else if(key !== 'modules'){
      tasks[key] = model[key];
    }
  }

  const includeOrder = this.includeOrder.slice();
  for(let key in model.modules) {
    includeOrder.push(`modules/${key}.yml`);
  }

  return { playbook, tasks, modules, includeOrder };
};

Modeler.prototype.buildModulesModel = function(filename, model, playbook) {
  const tasks = model.map((entry) => {
    const meta = { filename };
    const facts = {};

    for(let key in entry) {
      if(this.moduleMetaKeys.has(key)) {
        meta[key] = entry[key];
      } else {
        facts[key] = entry[key];
      }
    }

    return { meta, facts };
  });

  return { playbook, tasks };
};

module.exports = Modeler;
