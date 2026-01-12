const h = require('virtual-dom/h');
const diff = require('virtual-dom/diff');
const patch = require('virtual-dom/patch');
const createElement = require('virtual-dom/create-element');

let tree = h('div', {}, []);
let rootNode = createElement(tree);
document.body.appendChild(rootNode);

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
  const newTree = h('div', {}, list);

  const start = performance.now();
  const patches = diff(tree, newTree);
  rootNode = patch(rootNode, patches);
  tree = newTree;
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
    const endTree = h('div', {}, list);
    const patches = diff(tree, endTree);
    rootNode = patch(rootNode, patches);
  }
}, 100);
