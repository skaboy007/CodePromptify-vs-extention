CodePromptify
Generate structured prompts from your codebase directly within Visual Studio Code.

Table of Contents
Introduction
Features
Installation
Usage
Configuration
Example
Contributing
License
Introduction
CodePromptify is a Visual Studio Code extension that allows you to generate structured prompts from your codebase. It gathers file contents from your project, filters them based on specified patterns, and compiles them into a customizable prompt using a template. This is especially useful for creating summaries, documentation, or preparing code snippets for AI language models.

Features
File Content Gathering: Collects contents from all files in your project directory.
Pattern Filtering: Includes or excludes files based on glob patterns.
Custom Templates: Uses Handlebars templates for prompt customization.
Token Counting: Calculates the token count of the generated prompt using GPT-3 tokenization.
Clipboard Integration: Copies the generated prompt to the clipboard for easy sharing.
In-Editor Display: Opens the generated prompt in a new editor tab within VS Code.
Line Numbers: Optionally includes line numbers in code snippets.
Code Blocks: Wraps code snippets in markdown code blocks for better readability.
Installation
Install via VS Code Marketplace:

Open Visual Studio Code.
Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window or by pressing Ctrl+Shift+X.
Search for CodePromptify.
Click Install on the extension named CodePromptify.
Manual Installation:

Download the latest .vsix file from the Releases page.
In VS Code, go to the Extensions view.
Click on the three-dot menu at the top-right corner and select Install from VSIX....
Select the downloaded .vsix file to install.
Usage
Open Your Project:

Ensure you have a workspace folder open in VS Code containing the code you want to generate a prompt from.
Run CodePromptify Command:

Open the Command Palette by pressing Ctrl+Shift+P (Cmd+Shift+P on macOS).
Type CodePromptify: Generate Prompt and select it.
View the Generated Prompt:

A new editor tab will open displaying the generated prompt.
The prompt is also copied to your clipboard for convenience.
Token Count Notification:

After the prompt is generated, a notification will display the total token count.
Configuration
CodePromptify offers several configuration options to customize its behavior. You can access these settings in VS Code's settings under Extensions > CodePromptify.

Settings
Include Patterns (codepromptify.includePatterns):

Type: array of string
Default: ["**/*.js", "**/*.ts", "**/*.py"]
Description: Glob patterns of files to include.
Exclude Patterns (codepromptify.excludePatterns):

Type: array of string
Default: ["**/node_modules/**", "**/.git/**"]
Description: Glob patterns of files to exclude.
Template Content (codepromptify.templateContent):

Type: string
Default:
handlebars
Copy code
# Codebase: {{directoryName}}

{{#each files}}
### {{path}}
{{#if ../useCodeblock}}
{{{content}}}
bash
Copy code
{{else}}
{{{content}}}
{{/if}}

{{/each}}
```
Description: Handlebars template used to format the generated prompt.
Use Codeblock (codepromptify.useCodeblock):

Type: boolean
Default: true
Description: Wrap code snippets inside markdown code blocks.
Line Numbers (codepromptify.lineNumbers):

Type: boolean
Default: false
Description: Include line numbers in code snippets.
How to Configure
Open Settings:

Go to File > Preferences > Settings (Code > Preferences > Settings on macOS).
Search for CodePromptify:

Type codepromptify in the search bar to filter settings.
Adjust Settings:

Modify the settings as per your requirements.
Example
Sample Template
handlebars
Copy code
# Project: {{directoryName}}

{{#each files}}
## {{path}}
\`\`\`
{{{content}}}
\`\`\`

{{/each}}

_Total Token Count: {{tokenCount}}_
Sample Output
shell
Copy code
# Project: MyAwesomeApp

## src/index.js
javascript
Copy code
console.log('Hello, World!');
shell
Copy code

## src/utils/helper.js
javascript
Copy code
export function add(a, b) {
  return a + b;
}
mathematica
Copy code

_Total Token Count: 45_
Contributing
Contributions are welcome! If you have ideas for improvements or find a bug, please open an issue or submit a pull request.

Steps to Contribute
Fork the Repository:

Click on the Fork button at the top of the repository page.
Clone Your Fork:

bash
Copy code
git clone https://github.com/your-username/CodePromptify.git
Create a New Branch:

bash
Copy code
git checkout -b feature/your-feature-name
Make Your Changes.

Commit and Push:

bash
Copy code
git add .
git commit -m "Description of your changes"
git push origin feature/your-feature-name
Submit a Pull Request:

Go to the original repository and click on Pull Requests.
Click on New Pull Request and select your branch to merge.
License
This project is licensed under the MIT License.

Acknowledgments
Inspired by the original CodePromptify utility tool.
Thanks to all contributors and users for their support.
Enjoy using CodePromptify! If you find this extension helpful, please consider giving it a star on GitHub or leaving a review on the VS Code Marketplace.