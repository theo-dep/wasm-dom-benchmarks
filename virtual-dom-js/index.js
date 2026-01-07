const h = require('virtual-dom/h');
const diff = require('virtual-dom/diff');
const patch = require('virtual-dom/patch');
const createElement = require('virtual-dom/create-element');

let tree = h('div', {}, []);
let rootNode = createElement(tree);
document.body.appendChild(rootNode);

let cnt = 0;
const nbElements = 30000;
const timeList = [];
const id = setInterval(() => {
  const start = performance.now();
  {
    const list = [];
    for (let i = 0; i < nbElements; i++) {
      list.push(
        h('div', {}, [ Math.random() + '' ])
      );
    }
    const newTree = h('div', {}, list);
    const patches = diff(tree, newTree);
    rootNode = patch(rootNode, patches);
    tree = newTree;
  }
  const end = performance.now();
  timeList.push(end - start);

  cnt++;
  if (cnt >= 10) {
    clearInterval(id);

    const list = [];
    for (const mesure of timeList) {
      list.push(
        h('div', {}, `apply patch in ${nbElements} elements: ${mesure.toFixed(2)} ms`)
      );
    }
    const endTree = h('div', {}, list);
    const patches = diff(tree, endTree);
    rootNode = patch(rootNode, patches);
  }
}, 100);
