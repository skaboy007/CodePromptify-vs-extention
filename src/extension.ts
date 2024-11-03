// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// src/extension.ts

import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs-extra';
import * as glob from 'glob';
import * as Handlebars from 'handlebars';
import { encode } from 'gpt-3-encoder';



// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
// src/extension.ts

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('codepromptify.generatePrompt', async () => {
	  try {
		// Step 1: Get the workspace folder
		const workspaceFolders = vscode.workspace.workspaceFolders;
		if (!workspaceFolders) {
		  vscode.window.showErrorMessage('No workspace folder open.');
		  return;
		}
		const workspaceFolder = workspaceFolders[0].uri.fsPath;
  
		// Step 2: Load configuration settings
		const config = vscode.workspace.getConfiguration('codepromptify');
		const includePatterns = config.get<string[]>('includePatterns') || [];
		const excludePatterns = config.get<string[]>('excludePatterns') || [];
		const templateContent = config.get<string>('templateContent') || '';
		const useCodeblock = config.get<boolean>('useCodeblock') || false;
		const lineNumbers = config.get<boolean>('lineNumbers') || false;
  
		// Step 3: Gather files based on patterns
		const files = gatherFiles(workspaceFolder, includePatterns, excludePatterns);
  
		// Step 4: Read file contents
		const filesData = files.map(filePath => {
		  const content = getFileContents(filePath, lineNumbers);
		  const relativePath = path.relative(workspaceFolder, filePath);
		  const formattedContent = formatContent(relativePath, content, useCodeblock);
		  return {
			path: relativePath,
			content,
			formattedContent
		  };
		});

		// Step 6: Render the template
		const contextData = {
			directoryName: path.basename(workspaceFolder),
			files: filesData,
		  };
		  const outputContent = renderTemplate(templateContent, contextData);
		  const tokenCount = countTokens(outputContent);
  
		// Step 7: Display the output
		const doc = await vscode.workspace.openTextDocument({
		  content: outputContent,
		  language: 'markdown'
		});
		await vscode.window.showTextDocument(doc);
  
		// Optional: Copy to clipboard
		await vscode.env.clipboard.writeText(outputContent);
		vscode.window.showInformationMessage(`Prompt generated and copied to clipboard. Token count: ${tokenCount}`);

  
	  } catch (error) {
		vscode.window.showErrorMessage(`An error occurred: ${error}`);
	  }
	});
  
	context.subscriptions.push(disposable);
  }
  

  // src/extension.ts

function gatherFiles(workspaceFolder: string, includePatterns: string[], excludePatterns: string[]): string[] {
	const options = {
	  cwd: workspaceFolder,
	  ignore: excludePatterns,
	  nodir: true,
	  absolute: true
	};
	let files: string[] = [];
	includePatterns.forEach(pattern => {
	  files = files.concat(glob.sync(pattern, options));
	});
	return files;
  }
  
  function getFileContents(filePath: string, lineNumbers: boolean): string {
	try {
	  const content = fs.readFileSync(filePath, 'utf8');
	  if (lineNumbers) {
		const lines = content.split('\n');
		return lines.map((line, index) => `${index + 1}: ${line}`).join('\n');
	  }
	  return content;
	} catch (error) {
	  vscode.window.showErrorMessage(`Error reading ${filePath}: ${error}`);
	  return '';
	}
  }
  
  function formatContent(relativePath: string, content: string, useCodeblock: boolean): string {
  if (useCodeblock) {
    return `### ${relativePath}\n\`\`\`\n${content}\n\`\`\`\n`;
  } else {
    return `### ${relativePath}\n${content}\n`;
  }
}
  
  
  function renderTemplate(templateContent: string, contextData: any): string {
	const template = Handlebars.compile(templateContent);
	return template(contextData);
  }
  

  function countTokens(text: string): number {
	return encode(text).length;
  }

// This method is called when your extension is deactivated
export function deactivate() {}


