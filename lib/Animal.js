function Animal(type) {
  this.isAlive = true;
  this.type = type;
  this.health = 1;
}

Animal.prototype.beCute = function () {
  this.isCute = true;
};

Animal.prototype.updateHealthStats = function (cb) {
  // this.health = Math.random();

  var self = this;

  setTimeout(function () {
    self.health = Math.random();
    cb();
  }, 5000);
}

module.exports = Animal;
