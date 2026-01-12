import { init, h } from "snabbdom";

const patch = init([]);

let vnode = h('div', {});
const root = document.getElementById('root');
patch(root, vnode);

let cnt = 0;
const nbRuns = 100;
const nbElements = 30000;
const timeList = [];
const id = setInterval(() => {
  const list = [];
  for (let i = 0; i < nbElements; i++) {
    list.push(
      h('div', {}, Math.random() + '')
    );
  }
  const newVnode = h('div', {}, list);

  const start = performance.now();
  vnode = patch(vnode, newVnode);
  const end = performance.now();
  timeList.push(end - start);

  cnt++;
  if (cnt >= nbRuns) {
    clearInterval(id);

    const list = [ h('div', {}, `apply patch in ${nbElements} elements (ms)`) ];
    for (const mesure of timeList) {
      list.push(
        h('div', {}, mesure.toFixed(2) + '')
      );
    }
    const endVnode = h('div', {}, list);
    patch(vnode, endVnode);
  }
}, 100);
