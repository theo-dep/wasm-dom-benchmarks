import wasmdomLoader from 'wasm-dom-c-js';
const wasmdom = await wasmdomLoader();

const patchFirst = wasmdom["patchFirst"];
const patch = wasmdom["patch"];
const h = wasmdom["h"];
const hs = wasmdom["hs"];

let vnode = h('div', '');
const root = document.getElementById('root');
patchFirst(root, vnode);

let cnt = 0;
const nbRuns = 100;
const nbElements = 30000;
const timeList = [];
const id = setInterval(() => {
  const list = new wasmdom.Children();
  for (let i = 0; i < nbElements; i++) {
    list.push_back(
      h('div', Math.random() + '')
    );
  }
  const newVnode = hs('div', list);

  const start = performance.now();
  vnode = patch(vnode, newVnode);
  const end = performance.now();
  timeList.push(end - start);

  cnt++;
  if (cnt >= nbRuns) {
    clearInterval(id);

    const list = new wasmdom.Children();
    list.push_back(
      h('div', `apply patch in ${nbElements} elements (ms)`)
    );
    for (const mesure of timeList) {
      list.push_back(
        h('div', mesure.toFixed(2) + '')
      );
    }
    const endVnode = hs('div', list);
    patch(vnode, endVnode);
  }
}, 100);
