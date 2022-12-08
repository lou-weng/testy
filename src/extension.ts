import * as vscode from 'vscode';

import setGenerateStatusItem from "./statusItems/generateTestFileStatus";
import setHelloWorldStatusItem from "./statusItems/helloWorldStatus";

export function activate(context: vscode.ExtensionContext) {
	setHelloWorldStatusItem(context);
	setGenerateStatusItem(context);
}
