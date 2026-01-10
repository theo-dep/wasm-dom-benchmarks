set(TARGET_NAME asm-dom-cpp)
add_executable(${TARGET_NAME} main.cpp ${CMAKE_SOURCE_DIR}/node_modules/asm-dom/cpp/asm-dom.cpp)
target_include_directories(${TARGET_NAME} PRIVATE ${CMAKE_SOURCE_DIR}/node_modules/asm-dom/cpp)
target_link_options(${TARGET_NAME} PRIVATE
    -lembind
    -sEXPORTED_RUNTIME_METHODS=["UTF8ToString"]
    -sENVIRONMENT=web
    -sNO_FILESYSTEM
    -sNO_EXIT_RUNTIME
    -sALLOW_MEMORY_GROWTH
    -sASYNCIFY
)
configure_file(index.html ${CMAKE_CURRENT_BINARY_DIR}/index.html COPYONLY)
