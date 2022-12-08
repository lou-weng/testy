import * as vscode from 'vscode';
import StatusItem from './statusItem';

export default class GenerateTestStatusItem extends StatusItem {
	constructor(context: vscode.ExtensionContext) {
		super(context);
	}

	protected setup() {
		const commandId = 'testy.generateTest';
		const command = vscode.commands.registerCommand(commandId, () => {
			let config: string | undefined = vscode.workspace.getConfiguration('testy').get("testGeneration.setTestFileNameGenerationType");
			vscode.window.showInformationMessage(`Some message here with config value: ${config!}`);
		});
		
		let generateTestStatusItem: vscode.StatusBarItem = vscode.window.createStatusBarItem(
			vscode.StatusBarAlignment.Right, 
			100
		);
		generateTestStatusItem.command = commandId;
		generateTestStatusItem.text = "Generate";
		generateTestStatusItem.show();

		this.context.subscriptions.push(generateTestStatusItem);
		this.context.subscriptions.push(command);
	}

	private generateTestFileName(): string {
		return "";
	}
}
