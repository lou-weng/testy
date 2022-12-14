import * as vscode from 'vscode';

import GenerateTestStatusItem from "./statusItems/generateTestStatusItem";
import NavigateToSourceStatusItem from './statusItems/navigateToSourceStatusItem';
import SettingsStatusItem from './statusItems/settingsStatusItem';

export function activate(context: vscode.ExtensionContext) {
	const generateTestStatusItem = new GenerateTestStatusItem();
	const settingsStatusItem = new SettingsStatusItem();
	const navigateToSourceFile = new NavigateToSourceStatusItem();

	context.subscriptions.push(generateTestStatusItem.getStatusBarItem());
	context.subscriptions.push(generateTestStatusItem.getCommand());
	context.subscriptions.push(
		vscode.window.onDidChangeActiveTextEditor(
			() => generateTestStatusItem.windowUpdateAction()
		)
	);

	context.subscriptions.push(settingsStatusItem.getCommand());
	context.subscriptions.push(settingsStatusItem.getStatusBarItem());

	context.subscriptions.push(navigateToSourceFile.getCommand());
	context.subscriptions.push(navigateToSourceFile.getStatusBarItem());
	context.subscriptions.push(
		vscode.window.onDidChangeActiveTextEditor(
			() => navigateToSourceFile.windowUpdateAction()
		)
	);


	
}
