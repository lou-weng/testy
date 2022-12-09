import * as assert from 'assert';
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
        resetConfigurations();
    });
});


/*
    Test Cases
        - prefix
            - [ ] with valid prefix text
            - with blank prefix text (error)
            - with invalid prefix text
        - suffix
            - with valid suffix text
            - with balnk suffix text (error)
            - with invalid suffix text
        - none

*/
