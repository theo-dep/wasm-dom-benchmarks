#include <wasm-dom.hpp>

#include <emscripten/emscripten.h>

#include <chrono>
#include <format>
#include <random>
#include <vector>

int main()
{
    const emscripten::val root = emscripten::val::global("document").call<emscripten::val>("getElementById", emscripten::val("root"));
    wasmdom::VDom vdom(root);
    vdom.patch(wasmdom::VNode("div"));

    constexpr int nbElements = 30000;
    std::vector<std::chrono::milliseconds> timeList;

    std::mt19937_64 gen;
    std::uniform_real_distribution<> distrib(0, 1);

    for (int cnt = 0; cnt < 10; ++cnt) {
        const auto start = std::chrono::high_resolution_clock::now();
        {
            wasmdom::Children list;
            for (int i = 0; i < nbElements; ++i) {
                list.push_back(
                    wasmdom::VNode("div")(std::to_string(distrib(gen)))
                );
            }
            const auto newVnode = wasmdom::VNode("div")(list);
            vdom.patch(newVnode);
        }
        const auto end = std::chrono::high_resolution_clock::now();
        timeList.push_back(std::chrono::duration_cast<std::chrono::milliseconds>(end - start));

        emscripten_sleep(100);
    }

    wasmdom::Children list;
    for (const auto& mesure : timeList) {
        list.push_back(
            wasmdom::VNode("div")(std::format("apply patch in {} elements: {} ms", nbElements, mesure.count()))
        );
    }
    const auto endVnode = wasmdom::VNode("div")(list);
    vdom.patch(endVnode);

    return 0;
}
