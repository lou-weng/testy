import * as vscode from 'vscode';
import { StatusBarItem, Disposable } from "vscode";
import { COMMAND_OPEN_SETTINGS, EXTENSION_NAME } from "../utils/constants";
import StatusItem from "./statusItem";

const TOOLTIP = `Testy Settings: Configure settings for the Testy extension. 
The absolute paths of your source code folder and test folder are needed. 
`;

export default class SettingsStatusItem extends StatusItem {
    private commandId: string = COMMAND_OPEN_SETTINGS;
    
    public getStatusBarItem(): StatusBarItem {
        const generateSettingsStatusItem: vscode.StatusBarItem = vscode.window.createStatusBarItem(
            vscode.StatusBarAlignment.Right, 
            99
        );
        generateSettingsStatusItem.command = this.commandId;
        generateSettingsStatusItem.text = "Testy $(gear)";
        generateSettingsStatusItem.tooltip = TOOLTIP;
        generateSettingsStatusItem.show();

        return generateSettingsStatusItem;
    }

    public getCommand(): Disposable {
        const command = vscode.commands.registerCommand(this.commandId, () => {
            void vscode.commands.executeCommand('workbench.action.openSettings', EXTENSION_NAME);
        });
    
        return command;
    }
}
