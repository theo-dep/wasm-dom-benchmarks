#include <wasm-dom/vdom.hpp>
#include <wasm-dom/vnode.hpp>

#include <emscripten/bind.h>

EMSCRIPTEN_BINDINGS(wasmdom)
{
    emscripten::register_vector<wasmdom::VNode>("Children");

    emscripten::class_<wasmdom::VNode>("VNode")
        .constructor<const std::string&>()
        .function("setText", emscripten::select_overload<wasmdom::VNode&(const std::string&)>(&wasmdom::VNode::operator()))
        .function("setChildren", emscripten::select_overload<wasmdom::VNode&(const wasmdom::Children&)>(&wasmdom::VNode::operator()));

    emscripten::class_<wasmdom::VDom>("VDom")
        .constructor<const emscripten::val&>()
        .function("patch", &wasmdom::VDom::patch);
}
