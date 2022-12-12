import assert = require("assert");
import { ParsedPath } from "path";
import path = require("path");
import NavigateToSourceStatusItem from "../../../../statusItems/navigateToSourceStatusItem";
import { resetConfigurations, setConfigurations } from "../../../utils/modifyConfigurationUtil";

suite('Generate correct source file name given test file name', () => {
    let navigateToSourceStatusItem: NavigateToSourceStatusItem;
    let filenameGenerationType: string;
    let filenameGenerationText: string;

    let testFileName: ParsedPath;
    let expectedFileName: string;
    let generatedFileName: string;

    setup(() => {
        navigateToSourceStatusItem = new NavigateToSourceStatusItem();
    });

    test('Generate source file with custom prefix', async () => {
        filenameGenerationType = "prefix";
        filenameGenerationText = "test_";
        
        await setConfigurations(filenameGenerationType, filenameGenerationText);

        testFileName = path.parse("test_sample_component.py");
        expectedFileName = "sample_component.py";
        generatedFileName = navigateToSourceStatusItem.generateSourceFileName(testFileName);
        
        assert.equal(generatedFileName, expectedFileName);
    });

    test ('Generate source file with custom suffix', async () => {
        filenameGenerationType = "suffix";
        filenameGenerationText = "Test";

        await setConfigurations(filenameGenerationType, filenameGenerationText);

        testFileName = path.parse("SampleComponentTest.java");
        expectedFileName = "SampleComponent.java";
        generatedFileName = navigateToSourceStatusItem.generateSourceFileName(testFileName);

        assert.equal(generatedFileName, expectedFileName);
    });

    test('Generate source file with custom suffix and period', async () => {
        filenameGenerationType = "suffix";
        filenameGenerationText = ".test";
        
        await setConfigurations(filenameGenerationType, filenameGenerationText);

        testFileName = path.parse("sampleComponent.test.js");
        expectedFileName = "sampleComponent.js";
        generatedFileName = navigateToSourceStatusItem.generateSourceFileName(testFileName);
        
        assert.equal(generatedFileName, expectedFileName);
    });

    test ('Generate source file with none generation type', async () => {
        filenameGenerationType = "none";
        filenameGenerationText = "";

        await setConfigurations(filenameGenerationType, filenameGenerationText);

        testFileName = path.parse("SampleComponent.java");
        expectedFileName = testFileName.base;
        generatedFileName = navigateToSourceStatusItem.generateSourceFileName(testFileName);

        assert.equal(generatedFileName, expectedFileName);
    });

    suiteTeardown(() => {
        resetConfigurations();
    });
});

suite('Generate source file path given a test file path', () => {
    let navigateToSourceStatusItem: NavigateToSourceStatusItem;
    let filenameGenerationType: string;
    let filenameGenerationText: string;

    let sourceDirectoryPath: string;
    let testDirectoryPath: string;
    let activeFilePath: string;

    let generatedParsedPath: ParsedPath;
    let expectedParsedPath: ParsedPath;

    setup(() => {
        navigateToSourceStatusItem = new NavigateToSourceStatusItem();
    });

    test('Generate file path with a test file with prefix', async () => {
        filenameGenerationType = "prefix";
        filenameGenerationText = "test_";
        await setConfigurations(filenameGenerationType, filenameGenerationText);

        testDirectoryPath = "project/test/";
        sourceDirectoryPath = "project/src/";
        activeFilePath = "project/test/test_sample_component.py";

        generatedParsedPath = navigateToSourceStatusItem.generateSourceFilePath(
            sourceDirectoryPath, 
            testDirectoryPath,
            activeFilePath
        );
        expectedParsedPath = path.parse("project/src/sample_component.py");

        assert.equal(generatedParsedPath.base, expectedParsedPath.base);
        assert.equal(generatedParsedPath.dir, expectedParsedPath.dir);
    });

    test('Generate file path with a test file with suffix', async () => {
        filenameGenerationType = "suffix";
        filenameGenerationText = "Test";
        await setConfigurations(filenameGenerationType, filenameGenerationText);

        testDirectoryPath = "project/test/";
        sourceDirectoryPath = "project/src/";
        activeFilePath = "project/test/SampleComponentTest.java";

        generatedParsedPath = navigateToSourceStatusItem.generateSourceFilePath(
            sourceDirectoryPath, 
            testDirectoryPath,
            activeFilePath
        );
        expectedParsedPath = path.parse("project/src/SampleComponent.java");

        assert.equal(generatedParsedPath.base, expectedParsedPath.base);
        assert.equal(generatedParsedPath.dir, expectedParsedPath.dir);
    });

    test('Generate file path with a test file with none file text append type', async () => {
        filenameGenerationType = "none";
        filenameGenerationText = "";
        await setConfigurations(filenameGenerationType, filenameGenerationText);

        testDirectoryPath = "project/test/";
        sourceDirectoryPath = "project/src/";
        activeFilePath = "project/test/sampleComponent.js";

        generatedParsedPath = navigateToSourceStatusItem.generateSourceFilePath(
            sourceDirectoryPath, 
            testDirectoryPath,
            activeFilePath
        );
        expectedParsedPath = path.parse("project/src/sampleComponent.js");

        assert.equal(generatedParsedPath.base, expectedParsedPath.base);
        assert.equal(generatedParsedPath.dir, expectedParsedPath.dir);
    });

    test('Generate file path when test directory in source directory', async () => {
        filenameGenerationType = "prefix";
        filenameGenerationText = "_text";
        await setConfigurations(filenameGenerationType, filenameGenerationText);
        
        testDirectoryPath = "project/test/";
        sourceDirectoryPath = "project/src/";
        activeFilePath = "project/test/test_sample_component.py";

        generatedParsedPath = navigateToSourceStatusItem.generateSourceFilePath(
            sourceDirectoryPath, 
            testDirectoryPath,
            activeFilePath
        );
        expectedParsedPath = path.parse("project/src/sample_component.py");

        assert.equal(generatedParsedPath.base, expectedParsedPath.base);
        assert.equal(generatedParsedPath.dir, expectedParsedPath.dir);
    });
});
