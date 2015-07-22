var path = require('path');
var should = require('chai').should();
var Animal = require(path.join(process.cwd(), '/lib/Animal'));
var cp = require('child_process');

describe('Mocha + Chai', function () {
  it('truthyness', function () {
    true.should.be.true;
    false.should.be.false;
  });
});

describe('CLI', function () {
  it('should thank me for downloading', function (done) {
    cp.execFile('./app.js', function (err, stdout) {
      stdout.should.equal('Thanks for downloading my app!\n');
      done();
    });
  });
});

describe('Animal', function () {
  describe('constructor', function () {
    it('should return an Animal object', function () {
      var animal = new Animal();

      animal.should.be.an('object');
      animal.should.be.an.instanceOf(Animal);
    });
    it('should be alive', function () {
      var animal = new Animal();

      animal.isAlive.should.be.true;
    });
    it('should have 100% health', function () {
      var animal = new Animal();
      animal.health.should.equal(1);
    });
    it('should accept a type', function () {
      var cat = new Animal('cat');
      var dog = new Animal('dog')
      cat.type.should.equal('cat');
      dog.type.should.equal('dog');
    });
  });

  describe('#updateHealthStats()', function () {
    it('should change the health', function (done) {
      this.timeout(30000);

      var animal = new Animal();
      var health = animal.health;

      animal.updateHealthStats(function () {
        animal.health.should.not.equal(health);
        done();
      });
    })
  })

  describe('#beCute()' , function () {
    it('should be a prototype method', function () {
      var animal = new Animal();
      animal.should.respondTo('beCute');
      animal.should.not.have.ownProperty('beCute');
    });

    it('should make the animal cute', function () {
      var animal = new Animal();
      should.not.exist(animal.isCute);
      animal.beCute();
      animal.isCute.should.be.true;
    });
  });
});

describe('Array', function () {
  describe('#filter()', function () {
    it('should return an array of items that return truthy in the inner fn', function () {
      var array = [1,2,3,4,5];

      var output = array.filter(function (item) {
        return item % 2;
      });

      output.should.eql([1,3,5]);
    });
  });

  describe('#map()', function () {
    it('should return an array with the return value of the inner fn', function () {
      var array = [1,2,3,4,5];

      var output = array.map(function (item) {
        return item * item;
      });

      output.should.eql([1,4,9,16,25]);
    });

    it('should keep the same length', function () {
      var array = [1,2,3,4,5];

      var length = array.map(function () {
        return false;
      }).length;

      length.should.equal(array.length);
    });

    it('should not mutate the original array', function () {
      var array = [1,2,3,4,5];

      array.map(function () {
        return false;
      });

      array.should.eql([1,2,3,4,5]);
    });
  });
});
