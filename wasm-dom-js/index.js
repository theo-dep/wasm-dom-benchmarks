import wasmdomLoader from 'wasm-dom-js';
const wasmdom = await wasmdomLoader();

const root = document.getElementById('root');
const vdom = new wasmdom.VDom(root);
vdom.patch(new wasmdom.VNode('div'));

let cnt = 0;
const nbRuns = 100;
const nbElements = 30000;
const timeList = [];
const id = setInterval(() => {
  const list = new wasmdom.Children();
  for (let i = 0; i < nbElements; i++) {
    list.push_back(
      new wasmdom.VNode('div').setText(Math.random() + '')
    );
  }
  const newVnode = new wasmdom.VNode('div').setChildren(list);

  const start = performance.now();
  vdom.patch(newVnode);
  const end = performance.now();
  timeList.push(end - start);

  cnt++;
  if (cnt >= nbRuns) {
    clearInterval(id);

    const list = new wasmdom.Children();
    list.push_back(
      new wasmdom.VNode('div').setText(`apply patch in ${nbElements} elements (ms)`)
    );
    for (const mesure of timeList) {
      list.push_back(
        new wasmdom.VNode('div').setText(mesure.toFixed(2) + '')
      );
    }
    const endVnode = new wasmdom.VNode('div').setChildren(list);
    vdom.patch(endVnode);
  }
}, 100);
