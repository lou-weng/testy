import { assert } from 'console';
import * as vscode from 'vscode';
import * as testy from '../../../../extension';
import GenerateTestStatusItem from "../../../../statusItems/generateTestStatusItem";

suite("Generate test file name", () => {
    let generateTestStatusItem: GenerateTestStatusItem;
    let context: vscode.ExtensionContext;

    setup(async () => {
        const extension = vscode.extensions.getExtension("publisher.testy");
        context = await extension?.activate();
    });

    test('Generate test file with custom prefix', () => {
        assert(1 === 6 * 1);
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
