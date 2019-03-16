const promptDirectory = require('inquirer-directory');
const path = require('path');

module.exports = function (plop) {
  
  plop.setPrompt('directory', promptDirectory);
  plop.addHelper('absPath', function (p) {
		return path.resolve(plop.getPlopfilePath(), p);
	});

  // Create category here, prefix with 'c-'
  plop.setGenerator('C-ategory-generate', {
      description: 'create c-ategory directory and its index.md',
      prompts: [{
        type: 'input',
        name: 'name',
        message: 'Category Name Please:',
        validate: function (value) {
					if ((/.+/).test(value)) { return true; }
					return 'Categrory Name is REQUIRED!!';
				}
      }],
      actions: data => {
        // Get current date
        data.createdDate = new Date().toISOString();
        
        return [
          {
            type: 'add',
            path: '../data/category/c-{{dashCase name}}/index.md',
            templateFile: 'plop-templates/category.md.tpl'
          },
          ()=>`Categrory: ${data.name} Successfully Generated!`
        ]
      }
  });

  // Create tutorial directory and skeleton content in one category
  // prefix with 't-'
  plop.setGenerator('T-utorial-generate', {
		description: 'create t-utorial under selected c-ategory directory',
		prompts: [
			{
				type: 'input',
				name: 'title',
				message: 'Step 1/5, Tutorial Title: ',
				validate: function (value) {
					if ((/.+/).test(value)) { return true; }
					return 'Tutorial Title is REQUIRED!!';
				}
      }, {
        type: 'input',
        name: 'author',
        message: 'Step 2/5, Author Name(Robin by default) is: (Press Enter key to ignore)',
      }, {
        type: 'input',
        name: 'emphasis',
        message: 'Step 3/5, The most valuable info you want to deliver to your reader: (Press Enter key to ignore)',
      }, {
				type: 'directory',
				name: 'path',
				message: 'Step 4/5, Which category would you like to put this tutorial under?',
				basePath: './data/category'
      },{
        type: 'confirm',
        name: 'unlocknext',
        message: 'Step 5/5, Want to add an question to unlock BONUS? (Press Enter to add, press n to ignore)',
        default: true,
      },
		],
		actions: data => {
      var firstDT   = new Date();
      var secondeDT = new Date(firstDT.getTime()+1000);
      var thirdDT   = new Date(firstDT.getTime()+2000);
      
      data.date_1 = firstDT.toISOString();
      data.date_2 = secondeDT.toISOString();
      data.date_3 = thirdDT.toISOString();
      // add default value while no input
      if(!data.author) data.author = 'Robin'
      if(!data.emphasis){
        data.emphasis = 'Burying yourself in this content will be great likely rewarded an Easter Egg!'
      }

      return [
        {
          type: 'add',
          path: '../data/category/{{path}}/t-{{dashCase title}}/1-stone.md',
          templateFile: 'plop-templates/1-stone.md.tpl'
        },{
          type: 'add',
          path: '../data/category/{{path}}/t-{{dashCase title}}/2-paper.md',
          templateFile: 'plop-templates/2-paper.md.tpl'
        },{
          type: 'add',
          path: '../data/category/{{path}}/t-{{dashCase title}}/3-scissor.md',
          templateFile: 'plop-templates/3-scissor.md.tpl'
        },
        ()=>`Tutorial: ${data.title} Successfully Generated!`
      ]
    }
	});


  // Create quiz/test tempalte for one tutorial
  plop.setGenerator('Quiz-generate', {
    description: 'create small quiz for your tutorial',
    prompts: [
      {
        type: 'input',
        name: 'title',
        message: 'Quiz Title: (Press Enter key to ignore)',
      },{
        type: 'directory',
        name: 'path',
        message: 'Selet T-utorial in which you would like to put this quiz?',
        basePath: './data/category'
      },
    ],
    actions: data => {
      data.date = new Date().toISOString();
      return [
        {
          type: 'add',
          path: '../data/category/{{path}}/test.md',
          templateFile: 'plop-templates/test.md.tpl'
        },
        ()=>`Quiz: ${data.title} Successfully Generated!`
      ]
    }
  });


  // TODO: Add tutorial section

  
  // TODO: Add quiz questions

};