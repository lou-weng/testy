import * as vscode from 'vscode';

export default abstract class StatusItem {
    protected context: vscode.ExtensionContext;

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
        this.setup();
    }

    protected abstract setup(): void;
}
