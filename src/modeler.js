const _ = require('lodash');

const Modeler = function() {
  this.playbookModelKeys = new Set([ 'hosts', 'remote_user', 'become', 'become_user' ]);
  this.moduleMetaKeys = new Set([ 'module', 'taskName']);
  this.includeOrder = [
    'users.yml',
    'apt.yml',
    'git.yml',
    'samba.yml'
  ];

  this.dependencies = {
    'postgresql_user': [ 'python-psycopg2' ]
  }
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

  const ansibleModel = { playbook, tasks, modules, includeOrder };
  return this.rectifyAnsibleModel(ansibleModel);
};

Modeler.prototype.rectifyAnsibleModel = function(ansibleModel) {
  const packages = [];

  for(let key in ansibleModel.modules) {
    const modules = ansibleModel.modules[key];
    modules.tasks.forEach((task) => {
      const dependencies = this.dependencies[task.module];

      if(dependencies) {
        packages.push.apply(packages, dependencies);
      }
    });
  }

  ansibleModel.tasks.packages = ansibleModel.tasks.packages.concat(packages);
  return ansibleModel;
};

Modeler.prototype.buildModulesModel = function(filename, model, globalPlaybook) {
  const tasks = model.tasks.map((task) => {
    const result = { filename };

    for(let key in task) {
      if(key === 'name') {
        result[key] = task[key];
      } else {
        result.module = key;
        result.facts = task[key];
      }
    }

    return result;
  });

  const playbook = {};
  Object.assign(playbook, globalPlaybook);

  for(let key in model) {
    if(this.playbookModelKeys.has(key)) {
      playbook[key] = model[key];
    }
  }

  return { playbook, tasks };
};

module.exports = Modeler;
