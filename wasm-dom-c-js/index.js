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
const nbElements = 30000;
const timeList = [];
const id = setInterval(() => {
  const start = performance.now();
  {
    const list = new wasmdom.Children();
    for (let i = 0; i < nbElements; i++) {
      list.push_back(
        h('div', Math.random() + '')
      );
    }
    const newVnode = hs('div', list);
    vnode = patch(vnode, newVnode);
  }
  const end = performance.now();
  timeList.push(end - start);

  cnt++;
  if (cnt >= 10) {
    clearInterval(id);

    const list = new wasmdom.Children();
    for (const mesure of timeList) {
      list.push_back(
        h('div', `apply patch in ${nbElements} elements: ${mesure.toFixed(2)} ms`)
      );
    }
    const endVnode = hs('div', list);
    patch(vnode, endVnode);
  }
}, 100);
