import * as vscode from 'vscode';
import { CONFIGURATION_SET_TEST_FILE_NAME_GENERATION_TEXT, CONFIGURATION_SET_TEST_FILE_NAME_GENERATION_TYPE, EXTENSION_NAME } from '../utils/constants';

import StatusItem from './statusItem';

export default class GenerateTestStatusItem extends StatusItem {
	commandId: string = 'testy.generateTest';

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
			let config: string | undefined = vscode.workspace
				.getConfiguration(EXTENSION_NAME)
				.get(CONFIGURATION_SET_TEST_FILE_NAME_GENERATION_TYPE);
			vscode.window.showInformationMessage(`Some message here with config value: ${config!}`);
		});

		return command;
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
				testFileName = fileGenerateText + sourceFileName;
				break;
			}
			case "suffix": {
				let splitSourceFileName = sourceFileName.split(".");
				testFileName = splitSourceFileName[0] + fileGenerateText + splitSourceFileName[1];
				break;
			}
			default: {
				break;
			}
		}

		return testFileName;
	}
}
