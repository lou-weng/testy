import * as vscode from 'vscode';
import { 
    CONFIGURATION_SET_TEST_FILE_NAME_GENERATION_TEXT, CONFIGURATION_SET_TEST_FILE_NAME_GENERATION_TYPE, 
    EXTENSION_NAME 
} from '../../utils/constants';

const GLOBAL_CONFIGURATION_TARGET = true;

export async function setConfigurations(filenameGenerationType: string, fileGenerateText: string): Promise<void> {
    await vscode.workspace
        .getConfiguration(EXTENSION_NAME)
        .update(CONFIGURATION_SET_TEST_FILE_NAME_GENERATION_TYPE, filenameGenerationType, GLOBAL_CONFIGURATION_TARGET);
    await vscode.workspace   
        .getConfiguration(EXTENSION_NAME)
        .update(CONFIGURATION_SET_TEST_FILE_NAME_GENERATION_TEXT, fileGenerateText, GLOBAL_CONFIGURATION_TARGET);
}

export async function resetConfigurations(): Promise<void> {
    await vscode.workspace
        .getConfiguration(EXTENSION_NAME)
        .update(CONFIGURATION_SET_TEST_FILE_NAME_GENERATION_TYPE, undefined, GLOBAL_CONFIGURATION_TARGET);
    await vscode.workspace   
        .getConfiguration(EXTENSION_NAME)
        .update(CONFIGURATION_SET_TEST_FILE_NAME_GENERATION_TEXT, undefined, GLOBAL_CONFIGURATION_TARGET);
}
