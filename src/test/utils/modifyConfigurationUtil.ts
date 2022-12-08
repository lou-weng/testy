import * as vscode from 'vscode';
import { 
    CONFIGURATION_SET_TEST_FILE_NAME_GENERATION_TEXT, CONFIGURATION_SET_TEST_FILE_NAME_GENERATION_TYPE, 
    EXTENSION_NAME 
} from '../../utils/constants';

export function setConfigurations(filenameGenerationType: string, fileGenerateText: string): void {
    vscode.workspace
        .getConfiguration(EXTENSION_NAME)
        .update(CONFIGURATION_SET_TEST_FILE_NAME_GENERATION_TYPE, filenameGenerationType);
    vscode.workspace   
        .getConfiguration(EXTENSION_NAME)
        .update(CONFIGURATION_SET_TEST_FILE_NAME_GENERATION_TEXT, fileGenerateText);
}
