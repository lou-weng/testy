import * as vscode from 'vscode';

export default abstract class StatusItem {
    public abstract getStatusBarItem(): vscode.StatusBarItem;

    public abstract getCommand(): vscode.Disposable;
}
