// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

let myTestStatusBarItem: vscode.StatusBarItem;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const myCommandId = 'sample.printMessage';
	context.subscriptions.push(vscode.commands.registerCommand(myCommandId, () => {
		vscode.window.showInformationMessage("Hello there!");
	}));

	myTestStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
	myTestStatusBarItem.command = myCommandId;
	context.subscriptions.push(myTestStatusBarItem);

	myTestStatusBarItem.text = "Hello";
	myTestStatusBarItem.show();
}
