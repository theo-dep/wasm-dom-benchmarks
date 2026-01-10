#include <wasm-dom/vdom.hpp>
#include <wasm-dom/vnode.hpp>

#include <emscripten/bind.h>

wasmdom::VNode h(const std::string& sel, const std::string& text) { return wasmdom::VNode(sel)(text); }
wasmdom::VNode h(const std::string& sel, const wasmdom::Children& children) { return wasmdom::VNode(sel)(children); }

wasmdom::VDom vdom;
wasmdom::VNode patch(const emscripten::val& element, wasmdom::VNode vnode)
{
    vdom = wasmdom::VDom(element);
    return vdom.patch(vnode);
}

wasmdom::VNode patch(const wasmdom::VNode&, wasmdom::VNode vnode)
{
    return vdom.patch(vnode);
}

EMSCRIPTEN_BINDINGS(wasmdom)
{
    emscripten::register_vector<wasmdom::VNode>("Children");
    emscripten::class_<wasmdom::VNode>("VNode");
    emscripten::function("h", emscripten::select_overload<wasmdom::VNode(const std::string&, const std::string&)>(&h));
    emscripten::function("hs", emscripten::select_overload<wasmdom::VNode(const std::string&, const wasmdom::Children&)>(&h));
    emscripten::function("patchFirst", emscripten::select_overload<wasmdom::VNode(const emscripten::val&, wasmdom::VNode)>(&patch), emscripten::return_value_policy::reference());
    emscripten::function("patch", emscripten::select_overload<wasmdom::VNode(const wasmdom::VNode&, wasmdom::VNode)>(&patch), emscripten::return_value_policy::reference());
}
