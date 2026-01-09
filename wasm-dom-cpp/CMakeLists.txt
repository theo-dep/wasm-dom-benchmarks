set(TARGET_NAME wasm-dom-cpp)
add_executable(${TARGET_NAME} main.cpp)
target_link_libraries(${TARGET_NAME} PRIVATE wasm-dom compile_flags optimization_flags disable_exceptions)
target_link_options(${TARGET_NAME} PRIVATE
    -sENVIRONMENT=web
    -sNO_FILESYSTEM
    -sNO_EXIT_RUNTIME
    -sALLOW_MEMORY_GROWTH
    -sASYNCIFY
)
configure_file(index.html ${CMAKE_CURRENT_BINARY_DIR}/index.html COPYONLY)
