/**
 * Make the function `f` guarded asynchronously by `fguard`
 * @param {Function} f(...)     Function to guard
 * @param {Function} fguard(cb) Guard function that will be called before each call to f
 *
 * Features:
 *  - Guards are asynchronous
 *  - Only one guard runs at the same time
 *  - `f` calls are queued in FIFO order
 *  - Arguments are forwarded
 */
function AsyncCallGuard(f, fguard){
  var qargs   = [];
  var waiting = false;

  function next(){
    var args = qargs.shift();

    if(!args){
      waiting = false;
      return;
    }

    f.apply(null, args || []);

    if(qargs.length === 0){
      waiting = false;
      return;
    }

    fguard(next);
  }

  function wrapper(/* args ... */){
    qargs.push(arguments);

    if(waiting){return;}

    waiting = true;
    fguard(next);
  }

  return wrapper;
}

module.exports = AsyncCallGuard;
