var AsyncCallGuard = require('../asynccallguard');


exports['AsyncCallGuard Should return a function'] = function(t){
  var f  = function(){
    throw new Error("Should not be called");
  };
  var f2 = AsyncCallGuard(f, function guard(fcall){
    throw new Error("Should not be called");
  });
  t.equal(typeof f2, 'function');
  t.done();
};

exports['AsyncCallGuard should use the guard on each call'] = function(t){
  var i  = 0;
  var f  = function(a, b, c, d){d && d();};
  var f2 = AsyncCallGuard(f, function guard(fcall){
    i++;
    fcall();
  });

  f2();
  f2(1,2);
  f2(3,4);
  f2(5,6,7, function(){
    t.equal(i, 4);
    t.done();
  });
};
