import * as vscode from 'vscode';
import * as sinon from 'sinon';
import GenerateTestStatusItem from "../../../statusItems/generateTestStatusItem";

describe('Generate Test File', () => {
    describe('Generate test file name', () => {
        let generateTestStatusItem: GenerateTestStatusItem;
        let context: sinon.SinonStubbedInstance<vscode.ExtensionContext>;

        beforeEach(() => {
            generateTestStatusItem = new GenerateTestStatusItem(context);
        });

        describe('Generate test file with custom prefix', () => {
            
        });
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
