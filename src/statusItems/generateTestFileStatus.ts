import * as vscode from 'vscode';

export default function setGenerateStatusItem(context: vscode.ExtensionContext) {
	// function generateTestFilename() {
	// 	let textGenerationType: TextGenerationType = vscode.workspace.getConfiguration
	// }

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

	context.subscriptions.push(generateTestStatusItem);
	context.subscriptions.push(command);
}
