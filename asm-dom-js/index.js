import init from 'asm-dom';

init().then(asmDom => {
  const { h, patch } = asmDom;

  let vnode = h('div', {}, []);
  const root = document.getElementById('root');
  patch(root, vnode);

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
      const newVnode = h('div', {}, list);
      vnode = patch(vnode, newVnode);
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
      const endVnode = h('div', {}, list);
      patch(vnode, endVnode);
    }
  }, 100);
});
