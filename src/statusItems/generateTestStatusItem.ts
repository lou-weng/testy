import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { dirname, parse, ParsedPath } from 'path';
import * as vscode from 'vscode';
import { COMMAND_GENERATE_TEST, CONFIGURATION_SET_CODE_SOURCE_DIRECTORY, CONFIGURATION_SET_TEST_FILE_NAME_GENERATION_TEXT, CONFIGURATION_SET_TEST_FILE_NAME_GENERATION_TYPE, CONFIGURATION_SET_TEST_SOURCE_DIRECTORY, EXTENSION_NAME } from '../utils/constants';

import StatusItem from './statusItem';

export default class GenerateTestStatusItem extends StatusItem {
	private commandId: string = COMMAND_GENERATE_TEST;

	public getStatusBarItem(): vscode.StatusBarItem {
		let generateTestStatusItem: vscode.StatusBarItem = vscode.window.createStatusBarItem(
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
		let sourcePath: string | undefined = vscode.workspace
            .getConfiguration(EXTENSION_NAME)
            .get(CONFIGURATION_SET_CODE_SOURCE_DIRECTORY);

        let testPath: string | undefined = vscode.workspace
            .getConfiguration(EXTENSION_NAME)
            .get(CONFIGURATION_SET_TEST_SOURCE_DIRECTORY);

        let activeFilePath: string | undefined = vscode.window.activeTextEditor?.document.uri.path;

        if (!activeFilePath!.startsWith(sourcePath!)) {
            throw new Error("The current file is not in the code source directory");
        }

		this.generateTestFilePath(sourcePath!, testPath!, activeFilePath!);
	}

	public generateTestFilePath(sourcePath: string, testPath: string, activeFilePath: string) {
		let updatedPath: ParsedPath | undefined = parse(testPath + activeFilePath.replace(sourcePath!, ""));
		updatedPath.base = this.generateTestFileName(updatedPath.base);

        mkdirSync(updatedPath.dir, { recursive: true });

        if (!existsSync(`${updatedPath.dir}/${updatedPath.base}`)) {
            writeFileSync(`${updatedPath.dir}/${updatedPath.base}`, "");
        }

		let generatedTestFileUri: vscode.Uri = vscode.Uri.file(`${updatedPath.dir}/${updatedPath.base}`);
        vscode.window.showTextDocument(generatedTestFileUri, { preview: false });
	}

	public generateTestFileName(sourceFileName: string): string {
		let fileGenerationType: string | undefined = vscode.workspace
			.getConfiguration(EXTENSION_NAME)
			.get(CONFIGURATION_SET_TEST_FILE_NAME_GENERATION_TYPE);

		let fileGenerateText: string | undefined = vscode.workspace
			.getConfiguration(EXTENSION_NAME)
			.get(CONFIGURATION_SET_TEST_FILE_NAME_GENERATION_TEXT);

		let testFileName = sourceFileName;

		switch(fileGenerationType) {
			case "prefix": {
				testFileName = `${fileGenerateText}${sourceFileName}`;
				break;
			}
			case "suffix": {
				let splitSourceFileName = sourceFileName.split(".");
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
