set(TARGET_NAME wasm-dom-js)
add_executable(${TARGET_NAME} binding.cpp)
target_link_libraries(${TARGET_NAME} PRIVATE wasm-dom compile_flags optimization_flags disable_exceptions)
target_link_options(${TARGET_NAME} PRIVATE
    -sENVIRONMENT=web
    -sMODULARIZE
    -sNO_FILESYSTEM
    -sNO_EXIT_RUNTIME
    -sEXPORT_NAME=wasmdomLoader
    -sALLOW_MEMORY_GROWTH
    --no-entry
)
