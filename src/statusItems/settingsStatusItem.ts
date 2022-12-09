import * as vscode from 'vscode';
import { StatusBarItem, Disposable } from "vscode";
import { COMMAND_OPEN_SETTINGS, CONFIGURATION_SET_CODE_SOURCE_DIRECTORY, EXTENSION_NAME } from "../utils/constants";
import StatusItem from "./statusItem";

export default class SettingsStatusItem extends StatusItem {
    private commandId: string = COMMAND_OPEN_SETTINGS;
    
    public getStatusBarItem(): StatusBarItem {
        let generateSettingsStatusItem: vscode.StatusBarItem = vscode.window.createStatusBarItem(
            vscode.StatusBarAlignment.Right, 
            100
        );
        generateSettingsStatusItem.command = this.commandId;
        generateSettingsStatusItem.text = "Settings";
        generateSettingsStatusItem.show();

        return generateSettingsStatusItem;
    }

    public getCommand(): Disposable {
        const command = vscode.commands.registerCommand(this.commandId, () => {
            vscode.commands.executeCommand('workbench.action.openSettings', EXTENSION_NAME);
        });
    
        return command;
    }

}
