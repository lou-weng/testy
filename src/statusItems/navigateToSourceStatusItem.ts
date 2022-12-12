import * as vscode from 'vscode';
import * as path from 'path';
import { COMMAND_NAVIGATE_TO_SOURCE, CONFIGURATION_SET_CODE_SOURCE_DIRECTORY, CONFIGURATION_SET_TEST_FILE_NAME_GENERATION_TEXT, CONFIGURATION_SET_TEST_FILE_NAME_GENERATION_TYPE, CONFIGURATION_SET_TEST_SOURCE_DIRECTORY, EXTENSION_NAME } from "../utils/constants";
import StatusItem from "./statusItem";

export default class NavigateToSourceStatusItem extends StatusItem {
    private commandId: string = COMMAND_NAVIGATE_TO_SOURCE;
    
    public getStatusBarItem(): vscode.StatusBarItem {
        const generateNavigateSourceStatusItem: vscode.StatusBarItem = vscode.window.createStatusBarItem(
            vscode.StatusBarAlignment.Right,
            100
        );
        generateNavigateSourceStatusItem.command = this.commandId;
        generateNavigateSourceStatusItem.text = "Navigate";
        generateNavigateSourceStatusItem.show();

        return generateNavigateSourceStatusItem;
    }
    public getCommand(): vscode.Disposable {
        const command = vscode.commands.registerCommand(this.commandId, () => {
            this.navigateToSourceFile();
        });

        return command;
    }
    
    public navigateToSourceFile(): void {
        const sourceDirectoryPath: string | undefined = vscode.workspace
            .getConfiguration(EXTENSION_NAME)
            .get(CONFIGURATION_SET_CODE_SOURCE_DIRECTORY);

        const testDirectoryPath: string | undefined = vscode.workspace
            .getConfiguration(EXTENSION_NAME)
            .get(CONFIGURATION_SET_TEST_SOURCE_DIRECTORY);

        const activeFilePath: string | undefined = vscode.window.activeTextEditor?.document.uri.path;

        if (!activeFilePath!.startsWith(testDirectoryPath!)) {
            void vscode.window.showInformationMessage(`${activeFilePath} vs. ${testDirectoryPath}`);
            throw new Error("The current file is not in the test directory.");
        }

        const sourceCodeFilePath = this.generateSourceFilePath(sourceDirectoryPath!, testDirectoryPath!, activeFilePath!);
        const sourceCodeFilePathUri: vscode.Uri = vscode.Uri.parse(`${sourceCodeFilePath.dir}/${sourceCodeFilePath.base}`);
        void vscode.window.showTextDocument(sourceCodeFilePathUri, { preview: false });
    }

    public generateSourceFilePath(sourceDirectoryPath: string, testDirectoryPath: string, activeFilePath: string): path.ParsedPath {
        const updatedPath: path.ParsedPath = path.parse(sourceDirectoryPath + activeFilePath.replace(testDirectoryPath, ""));
        updatedPath.base = this.generateSourceFileName(path.parse(updatedPath.base));
        return updatedPath;
    }

    public generateSourceFileName(testFileName: path.ParsedPath): string {
        const fileGenerationType: string | undefined = vscode.workspace
			.getConfiguration(EXTENSION_NAME)
			.get(CONFIGURATION_SET_TEST_FILE_NAME_GENERATION_TYPE);

        const fileGenerateText: string | undefined = vscode.workspace
			.getConfiguration(EXTENSION_NAME)
			.get(CONFIGURATION_SET_TEST_FILE_NAME_GENERATION_TEXT);

        let sourceFileName: string; 

        switch(fileGenerationType) {
            case "prefix": {
                sourceFileName = testFileName.name.substring(fileGenerateText!.length);
                break;
            }
            case "suffix": {
                sourceFileName = testFileName.name.substring(0, testFileName.name.length - fileGenerateText!.length);
                break;
            }
            default: {
                sourceFileName = testFileName.name;
                break;
            }
        }

        return sourceFileName + testFileName.ext;
    }
}

