import * as assert from 'assert';
import * as path from 'path';
import GenerateTestStatusItem from "../../../../statusItems/generateTestStatusItem";
import { resetConfigurations, setConfigurations } from '../../../utils/modifyConfigurationUtil';

suite("Generate test file name", () => {
    let generateTestStatusItem: GenerateTestStatusItem = new GenerateTestStatusItem;
    let filenameGenerationType: string;
    let filenameGenerationText: string;

    let sourceFileName: string;
    let expectedFileName: string;
    let generatedFileName: string;

    setup(() => {
        generateTestStatusItem = new GenerateTestStatusItem();
    });

    test('Generate test file with custom prefix', async () => {
        filenameGenerationType = "prefix";
        filenameGenerationText = "test_";
        
        await setConfigurations(filenameGenerationType, filenameGenerationText);

        sourceFileName = "sample_component.py";
        expectedFileName = "test_sample_component.py";
        generatedFileName = generateTestStatusItem.generateTestFileName(sourceFileName);
        
        assert.equal(expectedFileName, generatedFileName);
    });

    test ('Generate test file with custom suffix', async () => {
        filenameGenerationType = "suffix";
        filenameGenerationText = "Test";

        await setConfigurations(filenameGenerationType, filenameGenerationText);

        sourceFileName = "SampleComponent.java";
        expectedFileName = "SampleComponentTest.java";
        generatedFileName = generateTestStatusItem.generateTestFileName(sourceFileName);

        assert.equal(expectedFileName, generatedFileName);
    });

    test ('Generate test file with none generation type', async () => {
        filenameGenerationType = "none";
        filenameGenerationText = "";

        await setConfigurations(filenameGenerationType, filenameGenerationText);

        sourceFileName = "SampleComponent.java";
        expectedFileName = sourceFileName;
        generatedFileName = generateTestStatusItem.generateTestFileName(sourceFileName);

        assert.equal(expectedFileName, generatedFileName);
    });

    suiteTeardown(() => {
        void resetConfigurations();
    });
});

suite("Generate test file path", () => {
    let generateTestStatusItem: GenerateTestStatusItem = new GenerateTestStatusItem;
    let filenameGenerationType: string;
    let filenameGenerationText: string;

    let sourceDirectoryPath: string;
    let testDirectoryPath: string;
    let activeFilePath: string;

    let expectedPath: path.ParsedPath;
    let generatedPath: path.ParsedPath;

    setup(() => {
        generateTestStatusItem = new GenerateTestStatusItem();
    });

    test('Generate test file path with prefix generation', async () => {
        filenameGenerationType = "prefix";
        filenameGenerationText = "test_";
        await setConfigurations(filenameGenerationType, filenameGenerationText);

        sourceDirectoryPath = "/projects/src";
        testDirectoryPath = "/projects/test";
        activeFilePath = "/projects/src/sample_component.py";

        generatedPath = generateTestStatusItem.generateTestFilePath(
            sourceDirectoryPath, 
            testDirectoryPath, 
            activeFilePath
        );
        expectedPath = path.parse("/projects/test/test_sample_component.py");

        assert.equal(generatedPath.dir, expectedPath.dir);
        assert.equal(generatedPath.base, expectedPath.base);
    });

    test('Generate test file path with suffix generation', async () => {
        filenameGenerationType = "suffix";
        filenameGenerationText = "Test";
        await setConfigurations(filenameGenerationType, filenameGenerationText);

        sourceDirectoryPath = "/projects/src";
        testDirectoryPath = "/projects/test";
        activeFilePath = "/projects/src/SampleComponent.java";

        generatedPath = generateTestStatusItem.generateTestFilePath(
            sourceDirectoryPath, 
            testDirectoryPath, 
            activeFilePath
        );
        expectedPath = path.parse("/projects/test/SampleComponentTest.java");

        assert.equal(generatedPath.dir, expectedPath.dir);
        assert.equal(generatedPath.base, expectedPath.base);
    });

    test('Generate test file path with suffix generation when suffix has period', async () => {
        filenameGenerationType = "suffix";
        filenameGenerationText = ".test";
        await setConfigurations(filenameGenerationType, filenameGenerationText);

        sourceDirectoryPath = "/projects/src";
        testDirectoryPath = "/projects/test";
        activeFilePath = "/projects/src/sampleComponent.js";

        generatedPath = generateTestStatusItem.generateTestFilePath(
            sourceDirectoryPath, 
            testDirectoryPath, 
            activeFilePath
        );
        expectedPath = path.parse("/projects/test/sampleComponent.test.js");

        assert.equal(generatedPath.dir, expectedPath.dir);
        assert.equal(generatedPath.base, expectedPath.base);
    });

    test('Generate test file path with none type generation', async () => {
        filenameGenerationType = "none";
        filenameGenerationText = "";
        await setConfigurations(filenameGenerationType, filenameGenerationText);

        sourceDirectoryPath = "/projects/src";
        testDirectoryPath = "/projects/test";
        activeFilePath = "/projects/src/sample_component.py";

        generatedPath = generateTestStatusItem.generateTestFilePath(
            sourceDirectoryPath, 
            testDirectoryPath, 
            activeFilePath
        );
        expectedPath = path.parse("/projects/test/sample_component.py");

        assert.equal(generatedPath.dir, expectedPath.dir);
        assert.equal(generatedPath.base, expectedPath.base);
    });

    test('Generate test file path when test directory is within source directory', async () => {
        filenameGenerationType = "prefix";
        filenameGenerationText = "test_";
        await setConfigurations(filenameGenerationType, filenameGenerationText);

        sourceDirectoryPath = "/projects/src";
        testDirectoryPath = "/projects/src/test";
        activeFilePath = "/projects/src/sample_component.py";

        generatedPath = generateTestStatusItem.generateTestFilePath(
            sourceDirectoryPath, 
            testDirectoryPath, 
            activeFilePath
        );
        expectedPath = path.parse("/projects/src/test/test_sample_component.py");

        assert.equal(generatedPath.dir, expectedPath.dir);
        assert.equal(generatedPath.base, expectedPath.base);
    });

    suiteTeardown(() => {
        void resetConfigurations();
    });
});
