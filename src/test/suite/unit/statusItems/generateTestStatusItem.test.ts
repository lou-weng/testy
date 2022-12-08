import * as assert from 'assert';
import * as vscode from 'vscode';
import GenerateTestStatusItem from "../../../../statusItems/generateTestStatusItem";
import { setConfigurations } from '../../../utils/modifyConfigurationUtil';

suite("Generate test file name", () => {
    let generateTestStatusItem: GenerateTestStatusItem = new GenerateTestStatusItem;
    let sourceFileName: string;

    let filenameGenerationType: string;
    let filenameGenerationText: string;

    setup(() => {
        generateTestStatusItem = new GenerateTestStatusItem();
        filenameGenerationType = "prefix";
        filenameGenerationText = "";
    });

    test('Generate test file with custom prefix', () => {
        filenameGenerationType = "prefix";
        filenameGenerationText = "test_";
        
        setConfigurations(filenameGenerationType, filenameGenerationText);

        sourceFileName = "sample_component.py";
        let expectedFileName = "test_sample_component.py";
        let testFileName = generateTestStatusItem.generateTestFileName(sourceFileName);
        
        assert.equal(expectedFileName, testFileName);
    });

    test ('Generate test file with custom suffix', () => {
        filenameGenerationType = "suffix";
        filenameGenerationText = "Test";

        setConfigurations(filenameGenerationType, filenameGenerationText);

        sourceFileName = "SampleComponent.java";
        let expectedFileName = "SampleComponentTest.java";
        let testFileName = generateTestStatusItem.generateTestFileName(sourceFileName);

        assert.equal(expectedFileName, testFileName);
    });
});


/*
    Test Cases
        - prefix
            - with valid prefix text
            - with blank prefix text (error)
            - with invalid prefix text
        - suffix
            - with valid suffix text
            - with balnk suffix text (error)
            - with invalid suffix text
        - none

*/
