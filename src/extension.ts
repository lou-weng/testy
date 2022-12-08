import * as vscode from 'vscode';

import GenerateTestStatusItem from "./statusItems/generateTestStatusItem";

export function activate(context: vscode.ExtensionContext) {
	new GenerateTestStatusItem(context);
}
