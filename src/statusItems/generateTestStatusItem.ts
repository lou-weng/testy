import { existsSync, mkdirSync, writeFileSync } from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { COMMAND_GENERATE_TEST, CONFIGURATION_SET_CODE_SOURCE_DIRECTORY, CONFIGURATION_SET_TEST_FILE_NAME_GENERATION_TEXT, CONFIGURATION_SET_TEST_FILE_NAME_GENERATION_TYPE, CONFIGURATION_SET_TEST_SOURCE_DIRECTORY, EXTENSION_NAME } from '../utils/constants';

import StatusItem from './statusItem';

export default class GenerateTestStatusItem extends StatusItem {
	private commandId: string = COMMAND_GENERATE_TEST;

	public getStatusBarItem(): vscode.StatusBarItem {
		const generateTestStatusItem: vscode.StatusBarItem = vscode.window.createStatusBarItem(
			vscode.StatusBarAlignment.Right, 
			100
		);
		generateTestStatusItem.command = this.commandId;
		generateTestStatusItem.text = "Generate";
		generateTestStatusItem.show();

		return generateTestStatusItem;
	}

	public getCommand(): vscode.Disposable {
		const command = vscode.commands.registerCommand(this.commandId, () => {
			this.generateTestFile();
		});

		return command;
	}

	public generateTestFile() {
		const sourcePath: string | undefined = vscode.workspace
            .getConfiguration(EXTENSION_NAME)
            .get(CONFIGURATION_SET_CODE_SOURCE_DIRECTORY);

        const testPath: string | undefined = vscode.workspace
            .getConfiguration(EXTENSION_NAME)
            .get(CONFIGURATION_SET_TEST_SOURCE_DIRECTORY);

        const activeFilePath: string | undefined = vscode.window.activeTextEditor?.document.uri.path;

        if (!activeFilePath?.startsWith(sourcePath!)) {
            throw new Error("The current file is not in the code source directory");
        }

		const generatedTestFilePath: path.ParsedPath = this.generateTestFilePath(sourcePath!, testPath!, activeFilePath);
		this.modifyTestFilePath(generatedTestFilePath);

		const generatedTestFileUri: vscode.Uri = vscode.Uri.file(`${generatedTestFilePath.dir}/${generatedTestFilePath.base}`);
        void vscode.window.showTextDocument(generatedTestFileUri, { preview: false });
	}

	public generateTestFilePath(sourcePath: string, testPath: string, activeFilePath: string): path.ParsedPath {
		const updatedPath: path.ParsedPath | undefined = path.parse(testPath + activeFilePath.replace(sourcePath, ""));
		updatedPath.base = this.generateTestFileName(updatedPath.base);
		return updatedPath;
	}

	public modifyTestFilePath(generatedPath: path.ParsedPath): void {
		mkdirSync(generatedPath.dir, { recursive: true });
		const pathAsString = `${generatedPath.dir}/${generatedPath.base}`;

        if (!existsSync(pathAsString)) {
            writeFileSync(pathAsString, "");
        }
	}

	public generateTestFileName(sourceFileName: string): string {
		const fileGenerationType: string | undefined = vscode.workspace
			.getConfiguration(EXTENSION_NAME)
			.get(CONFIGURATION_SET_TEST_FILE_NAME_GENERATION_TYPE);

		const fileGenerateText: string | undefined = vscode.workspace
			.getConfiguration(EXTENSION_NAME)
			.get(CONFIGURATION_SET_TEST_FILE_NAME_GENERATION_TEXT);

		let testFileName = sourceFileName;

		switch(fileGenerationType) {
			case "prefix": {
				testFileName = `${fileGenerateText}${sourceFileName}`;
				break;
			}
			case "suffix": {
				const splitSourceFileName = sourceFileName.split(".");
				testFileName = `${splitSourceFileName[0]}${fileGenerateText}.${splitSourceFileName[1]}`;
				break;
			}
			default: {
				break;
			}
		}

		return testFileName;
	}
}
