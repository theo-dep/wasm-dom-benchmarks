set(TARGET_NAME asm-dom-js-embind)
add_executable(${TARGET_NAME} binding.cpp ${CMAKE_SOURCE_DIR}/node_modules/asm-dom/cpp/asm-dom.cpp)
target_include_directories(${TARGET_NAME} PRIVATE ${CMAKE_SOURCE_DIR}/node_modules/asm-dom/cpp)
target_link_options(${TARGET_NAME} PRIVATE
    -lembind
    -sEXPORTED_RUNTIME_METHODS=["UTF8ToString"]
    -sENVIRONMENT=web
    -sMODULARIZE
    -sNO_FILESYSTEM
    -sNO_EXIT_RUNTIME
    -sEXPORT_NAME=asmdomLoader
    -sALLOW_MEMORY_GROWTH
    --no-entry
)
