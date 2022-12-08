import * as vscode from 'vscode';

import GenerateTestStatusItem from "./statusItems/generateTestStatusItem";

export function activate(context: vscode.ExtensionContext) {
	let generateTestStatusItem = new GenerateTestStatusItem();

	context.subscriptions.push(generateTestStatusItem.getStatusBarItem());
	context.subscriptions.push(generateTestStatusItem.getCommand());
}
