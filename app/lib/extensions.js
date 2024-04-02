import vscode from "vscode";

/**
 * @param {vscode.ExtensionContext} context
 */
export function activate(context) {
    let disposable = vscode.commands.registerCommand('example.readAllText', function () {
        // Get the active text editor
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            // Read the entire document text
            const fullText = document.getText();
            // Output the document text to the console
            console.log(fullText);
        } else {
            vscode.window.showInformationMessage('No active document.');
        }
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
