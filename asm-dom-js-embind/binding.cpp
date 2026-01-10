#include <asm-dom.hpp>

#include <emscripten/bind.h>

EMSCRIPTEN_BINDINGS(asmdom)
{
    emscripten::value_object<asmdom::Config>("Config");
    emscripten::value_object<asmdom::Data>("Data");
    emscripten::class_<asmdom::VNode>("VNode");
    emscripten::register_vector<asmdom::VNode*>("Children");
    emscripten::function("init", &asmdom::init);
    emscripten::function("h", emscripten::select_overload<asmdom::VNode*(const std::string&, const asmdom::Data&, const std::string&)>(&asmdom::h), emscripten::return_value_policy::take_ownership());
    emscripten::function("hs", emscripten::select_overload<asmdom::VNode*(const std::string&, const asmdom::Data&, const std::vector<asmdom::VNode*>&)>(&asmdom::h), emscripten::return_value_policy::take_ownership());
    emscripten::function("patch", emscripten::select_overload<asmdom::VNode*(asmdom::VNode*, asmdom::VNode*)>(&asmdom::patch), emscripten::return_value_policy::take_ownership());
    emscripten::function("patchFirst", emscripten::select_overload<asmdom::VNode*(const emscripten::val&, asmdom::VNode*)>(&asmdom::patch), emscripten::return_value_policy::take_ownership());
}
