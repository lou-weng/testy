# Testy - VSCode Test Helper
Sometimes it can be annoying to switch back and forth between source files and test files. 

## Definitions
Source file: a file that contains code for an application
Test file: a file that tests the code for an application (includes unit, integration tests)

## Core Features

The tool will be able to do the following tasks:
- [ ] From a source file -> click a button -> generate test file
    - testy will also generate the a file tree that mirrors the file location of the source file when creating the test
- [ ] From a source file -> click a button -> navigate to test file
    - if test file does not exist, button will be unclickable
- [ ] From a test file -> click a button -> navigate to source file
    - if source file does not exist, button will be unclickable

## Customization

The following settings can be configured by users
- [ ] Change test file name prefix/suffic (test_class.js vs. ClassTest.java)
- [ ] Change source/test file location
