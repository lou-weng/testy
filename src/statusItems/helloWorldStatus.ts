import * as vscode from 'vscode';

export default function setHelloWorldStatusItem(context: vscode.ExtensionContext) {
    const commandId = 'sample.printMessage';
    let command: vscode.Disposable = vscode.commands.registerCommand(
        commandId, 
        () => { vscode.window.showInformationMessage("Hello there!"); }
    );

	let myTestStatusBarItem: vscode.StatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
	myTestStatusBarItem.command = commandId;
    myTestStatusBarItem.text = "Hello";
	myTestStatusBarItem.show();

	context.subscriptions.push(myTestStatusBarItem);
    context.subscriptions.push(command);
}
