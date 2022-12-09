import * as vscode from 'vscode';

import GenerateTestStatusItem from "./statusItems/generateTestStatusItem";
import SettingsStatusItem from './statusItems/settingsStatusItem';

export function activate(context: vscode.ExtensionContext) {
	let generateTestStatusItem = new GenerateTestStatusItem();
	let settingsStatusItem = new SettingsStatusItem();

	context.subscriptions.push(generateTestStatusItem.getStatusBarItem());
	context.subscriptions.push(generateTestStatusItem.getCommand());

	context.subscriptions.push(settingsStatusItem.getCommand());
	context.subscriptions.push(settingsStatusItem.getStatusBarItem());
}
