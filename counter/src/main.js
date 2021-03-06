import Cycle from '@cycle/core';
import {h, makeDOMDriver} from '@cycle/dom';

function main({DOM}) {
  let action$ = Cycle.Rx.Observable.merge(
    DOM.get('.decrement', 'click').map(ev => -1),
    DOM.get('.increment', 'click').map(ev => +1)
  );
  let count$ = action$.startWith(0).scan((x,y) => x+y);
  return {
    DOM: count$.map(count =>
        h('div', [
          h('button.decrement', 'Decrement'),
          h('button.increment', 'Increment'),
          h('p', 'Counter: ' + count)
        ])
      )
  };
}

Cycle.run(main, {
  DOM: makeDOMDriver('#main-container')
});
