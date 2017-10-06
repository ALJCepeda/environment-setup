module.exports = function(handlebars) {
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

  handlebars.registerHelper('contains', (elem, list, options) => {
    if(list.indexOf) {
      if(list.indexOf(elem) > -1) {
        return options.fn(this);
      }

      return options.inverse(this);
    } else {
      if(list[elem]) {
        return options.fn(this);
      }

      return options.inverse(this);
    }
  });

  handlebars.registerHelper("inc", function(value, offset, options) {
    if(arguments.length === 3) {
      return parseInt(value) + parseInt(offset);
    }

    return parseInt(value) + 1;
  });
};
