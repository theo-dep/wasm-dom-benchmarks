import asmdomLoader from 'asm-dom-js-embind';
const asmdom = await asmdomLoader();

const init = asmdom["init"];
const patchFirst = asmdom["patchFirst"];
const patch = asmdom["patch"];
const h = asmdom["h"];
const hs = asmdom["hs"];

init({});

let vnode = h('div', {}, '');
const root = document.getElementById('root');
patchFirst(root, vnode);

let cnt = 0;
const nbElements = 30000;
const timeList = [];
const id = setInterval(() => {
  const start = performance.now();
  {
    const list = new asmdom.Children();
    for (let i = 0; i < nbElements; i++) {
      list.push_back(
        h('div', {}, Math.random() + '')
      );
    }
    const newVnode = hs('div', {}, list);
    vnode = patch(vnode, newVnode);
  }
  const end = performance.now();
  timeList.push(end - start);

  cnt++;
  if (cnt >= 10) {
    clearInterval(id);

    const list = new asmdom.Children();
    for (const mesure of timeList) {
      list.push_back(
        h('div', {}, `apply patch in ${nbElements} elements: ${mesure.toFixed(2)} ms`)
      );
    }
    const endVnode = hs('div', {}, list);
    patch(vnode, endVnode);
  }
}, 100);
