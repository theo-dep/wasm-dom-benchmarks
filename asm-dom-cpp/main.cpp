#include <asm-dom.hpp>

#include <emscripten/emscripten.h>

#include <chrono>
#include <format>
#include <random>
#include <vector>

int main()
{
    const asmdom::Config config = asmdom::Config();
    asmdom::init(config);

    asmdom::VNode* vnode = asmdom::h("div");
    const emscripten::val root = emscripten::val::global("document").call<emscripten::val>("getElementById", emscripten::val("root"));
    asmdom::patch(root, vnode);

    constexpr int nbRuns = 100;
    constexpr int nbElements = 30000;
    std::vector<std::chrono::nanoseconds> timeList;

    std::mt19937_64 gen;
    std::uniform_real_distribution<> distrib(0, 1);

    for (int cnt = 0; cnt < nbRuns; ++cnt) {
        asmdom::Children list;
        for (int i = 0; i < nbElements; ++i) {
            list.push_back(
                asmdom::h("div", {}, std::to_string(distrib(gen)))
            );
        }
        asmdom::VNode* newVnode = asmdom::h("div", {}, list);

        const auto start = std::chrono::high_resolution_clock::now();
        vnode = asmdom::patch(vnode, newVnode);
        const auto end = std::chrono::high_resolution_clock::now();
        timeList.push_back(end - start);

        emscripten_sleep(100);
    }

    asmdom::Children list{
         asmdom::h("div", {}, std::format("apply patch in {} elements (ms)", nbElements))
    };
    for (const auto& mesure : timeList) {
        list.push_back(
            asmdom::h("div", {}, std::to_string(mesure.count() / 1e6))
        );
    }
    const auto endVnode = asmdom::h("div", {}, list);
    asmdom::patch(vnode, endVnode);

    return 0;
}
