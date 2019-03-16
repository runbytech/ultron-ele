'use strict';
var inquirer = require('inquirer');

inquirer.registerPrompt('directory', require('inquirer-directory'));
inquirer.prompt([{
  type: 'directory',
  name: 'from',
  message: 'Where you like to put this component?',
  basePath: './content'
}]).then(function(answers) {
  // (answers.from is the path chosen)
  console.log(answers.from)
});