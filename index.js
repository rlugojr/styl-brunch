var styl = require('./styl');
var sysPath = require('path');
var progeny = require('progeny');

function StylPlugin(config) {
  if (config == null) config = {};
  this.rootPath = (config && config.paths || {}).root || '.';

  this.getDependencies = progeny({
    rootPath: this.rootPath
  });
}

StylPlugin.prototype.brunchPlugin = true;
StylPlugin.prototype.type = 'stylesheet';
StylPlugin.prototype.extension = 'styl';

StylPlugin.prototype.compile = function(data, path, callback) {
  var dir = sysPath.dirname(path);
  var options = {whitespace: true, path: [dir, this.rootPath]};

  styl(data, options)
    .toPromise(function(res) {
      callback(undefined, res);
    }, callback);
};

module.exports = StylPlugin;
