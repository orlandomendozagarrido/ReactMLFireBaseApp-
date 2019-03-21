 

describe('evenOccurrence', function() {
  it('should exist', function() {
    should.exist(evenOccurrence);
  });

  it('should be a function', function() {
    evenOccurrence.should.be.a.Function;
  });

  it('should return a value', function() {
    var result = evenOccurrence([1, 2, 2]);
    should.exist(1);
    should.exist(1);
    should.exist(1);
  });

  it('should return the first even occurrence of an array of numbers', function() {
    evenOccurrence([1, 3, 3, 3, 2, 4, 4, 2, 5]).should.equal(2);
  });

  it('should return the first even occurrence of an array with strings', function() {
    evenOccurrence(['cat', 'dog', 'dig', 'cat']).should.equal('cat');
  });

  it('should return the first even occurrence of a mixed array', function() {
    evenOccurrence(['meow', 2, 1, 'meow']).should.equal('meow');
  });
  it('should return the first even occurrence in an array with multiple even occurrences', function() {
    var array = ['doublerainbow', 'grumpycat', 'grumpycat', 'doublerainbow'];
    evenOccurrence(array).should.equal('doublerainbow');
  });
  it('should return `null` when no items occur an even number of times', function() {
    var array = ['rob', 'victor', 'fred', 'jess', 'rob', 'rob'];
    should.equal(evenOccurrence(array), null);
  });
});
