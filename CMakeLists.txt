cmake_minimum_required(VERSION 3.20)
project(wasm-dom LANGUAGES C CXX VERSION 0.3.0)

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_subdirectory(asm-dom-cpp)

set(WASM_DOM_STRICT ON)
set(WASM_DOM_NO_EXCEPTION ON)
set(WASM_DOM_FULL_OPTIMISATION ON)

add_subdirectory(wasm-dom)
add_subdirectory(wasm-dom-cpp)
add_subdirectory(wasm-dom-js)
