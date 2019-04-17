---
title: UltronEle User Guide
date: 2019-03-20
cover: /img/postbg2.png
anchors:
  - name: Prerequisites
    goto: '#prerequisites'
  - name: Installation
    goto: '#installation'
  - name: Usage Procedures - for Content Builder Role
    goto: '#usage-procedures'
  - name: Learning Precedures - for Content Learner Role
    goto: '#learning-precedures'
  - name: FAQs
    goto: '#faqs'
  - name: Tech Support
    goto: '#tech-support'
---

> UltronEle's mission is to build the world's fastest e-learning system with the fewest cost and in the most simple way, here's a complete user manual to describe how to do this from the ground.

## Content Index

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage Procedures - for Content Builder Role](#usage-procedures)
  - [Step 1 Ultronele starter project download](#step-1-ultronele-starter-project-download)
  - [Step 2 start the ultronele](#step-2-start-the-ultronele)
  - [Step 3 Generate category/tutorial/quiz content](#step-3-generate-categorytutorialquiz-content)
  - [Step 4 Deploy website to netlify](#step-4-deploy-website-to-netlify)
  - [Step 5 Custom website config and navigation menu](#step-5-custom-website-config-and-navigation-menu)
  - [Step 6 Update content and new version of Ultronele](#step-6-update-content-and-new-version-of-ultronele)
- [Learning Precedures - for Content Learner Role](#learning-precedures)
- [FAQs](#faqs)
- [Tech Support](#tech-support)

## Prerequisites

To run UltronEle in your local machine, a couples of tools required:

* Nodejs/NPM:  local running and build environment
* Gatsbyjs: website content compilation tool
* git cli/github account: repository for code and content host
* netlify account: web application build and host service


## Installation

UltronEle is created on the basis of Gatsbyjs, the most sexy open source CMS framework currently, and running in nodejs evnironment. While an ultronele copy is downloaded in user local machine, added new contents, to preview the new look of the site, nodejs/gatsby intallation is a must. Furthermore, if you want to deply these content to internet, then Github and its client, as well as Netlify account are also necessary. All this tools and service are free to use.

#### Nodejs/NPM installation

Official nodejs/npm installation address is [HERE](https://nodejs.org/en/download/), click and select an installer for your OS, download installation package to run and install.

![installer](/img/node_dnld.png)

```
to check your installation complete, open your console or terminal and run:

$ node -v
$ npm -v

if you see the version number, that means a successful installation. if it reports error please recheck the installation process.

in windows, console can be opened through `WIN` key -> input `cmd`, press `Enter` key to popup.
in MacOS, terminal can be seached by `terminal` .
```

#### Gatsbyjs installation

To quickly install gatsbyjs, you may begin with [get started](https://www.gatsbyjs.org/docs/quick-start) page. Open your console/terminal window, and run:

> $ npm install -g gatsby-cli

in MacOS, you may need to use sudo to install gatsby-cli tool.

#### Github account and client setup

First, sign up a new accout in [GitHub](https://github.com/).

we need a client to synchonize code and content with github central repository, the client have two forms, cli and desktop GUI. For a developer, a complete installation guidance is in [here](https://help.github.com/en/articles/set-up-git). For a general user, a [desktop version](https://help.github.com/en/desktop/getting-started-with-github-desktop) is more suitable.

```
for MacOS, git client is built-in, have a try on Mavericks (10.9) or above in terminal :

$ git --version

```

git client installation doc is [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), once you installed client, you can follow the guidance doc metioned above to setup github account.

#### Netlify account setup

Visit [Netlify](https://www.netlify.com/) to sign up a new accout. Netlify is an excellent platform for you deploy and build your website/application automatically even with no fee.


## Usage Procedures

```
Note: commands used below are in MacOS as default.
```


### Step 1 Ultronele starter project download

For v1, ultronele runs as a starter project, which means you can download it with command then modify the contents in this starter, deloy it, experience the whole use process.

To download(clone) ultronele, open your console, run command(for MacOS as an example):

> $ cd my-work-path

> $ gatsby new my-ultronele https://github.com/runbytech/ultron-ele

Rember the `gatsby` we installed before? Here we use it as download tool, `new` means that we'll create a new site in a directory named `my-ultronele`, sure, you can name it anyone you like. the http.... is the address where ultron-ele is hosted.

Copy the whole line from after the $ character, then paste to you console, Enter to execute.

For v2, we'll use ultronele as an independent theme to install...


### Step 2 start the ultronele

Once you downloaded the ultornele copy in your directory, you can enter your own ultronele then start it by:

> $ cd my-ultronele

> $ npm i

> $ gatsby develop



The seconde command `npm i` means using npm to install the dependencies of the project, `gatsby develop` means start the dev server. Once you saw the belowing console output, we say server started, then open browser and visit: `http://localhost:8000`

![gatsby started](/img/gatsby_started.png)

### Step 3 Generate category/tutorial/quiz content

One of the great features ultronele is to create elearning content including category, tutorial, quiz by command line(cli) in console/terminal window. Three generators are available, cagegory generator, tutorial generator, quiz generator, let's see how to use them.

#### __Use Category Generator__

Open a new console window, and enter your newly created ultronele application, then execute generate command:

> cd my-work-path/my-ultronele

> $ npm run generate

It will produce following results:

![select generator](/img/generator-select.png)

The prompt default points to the first option, `C-ategory generate`, we use this option to create a category. Press Enter key to start the generation. Input the new category name you'v planned like `World History` after the prompt words `Category Name Please:`, Press Enter key to confirm.

![show first](/img/generate-cate-showfirst.png)

It prompts us if the newly created `World History` shows in the first position of homepage gallary. If we agree this suggestion, press `y` and `Enter` key. If we don't care about this just press `Enter` key.

Here we just ignore the option by press Enter key, then the `World History` category created.

![category done](/img/generate-cate-done.png)

Now let's see what we've achieved:

![world history](/img/cate-world-history.png)

Saw the `World History` card in the gallery that red arrow points to? Click on the `World History` card, you will see the default category content.

You may wonder what on earth did we create in our project, let's have a look at the source change:

[![c-world-history](/img/c-world-history.png)](javascript:void(0))

Saw the `c-world-history` folder and the `index.md` file? That's we just created with category generator. The `index.md` file includes the default category content which you'd seen after clicked the `World History` card.

#### __Use Tutorial Generator__

Back to the console which created the category and rerun the generate command:

> $ npm run generate

This time we select the second generator `T-utorial-generate` by Down Arrow Key:

![generate tutorial](/img/generate-tutorial.png)

Press `Enter` key to start the tutorial generation dialog:

![gen tutorial select](/img/gen-tuto-select-cate.png)

Follow each step to input the necessary info like the sample above, while come to the `Step 4/5` , we use `Down Arrow` key to select `c-world-history` and press `Enter` to enter this directory:

![gen tutorial in cate](/img/gen-tuto-cate-confirm.png)

The `c-world-history` directory will hold all the tutorials, so, we must make sure that we are __UNDER THIS DIRECTORY__ and select `choose this directory` to put the new turoial in it. Press `Enter` key to confirm this.

```
Note: 

there would be another tutorial under this category next time you execute tutorial generator, while you enter the c-world-history directory you would see other tutorial directory like a-brief-history-of-europe and such, how to do next? 

move up or donw arrow key to select `choose this directory` and press Enter key to use the c-world-history directory.
```

In step 5, the generator suggest us to add a question to unlock BONUS:

![gen tuto bonus](/img/gen-tuto-bonus.png)

it's a good practice do this, so, we press `Enter` to accept it and finish the tutorial creation like this:

![gen tuto complete](/img/gen-tuto-complete.png)

What we've done under the hood? It's simple, we just created three default/dummy tutoiral section files under a directory by name of you input as a new tutorial title. Have a look at the source change: (a new directory and three .md file in it)

[![t-a-brief-history-of-europe](/img/t-a-brief-history-of-europe.png)](javascript:void(0))

Want to know how's your new tutorial look like? Just restart the develop server and refresh the category page.

```
Switch back to the console/terminal window you've run `gatsby develop`, press `ctr+c` combo key to stop it. 
Then execute this command:

$ rm -rf .cache && gatsby develop

this is a wholly new start server running command removed all the cache before.

Note: 

`rm -rf` is a MacOS command, if you're in Window, delete the .cache folder mannualy, and just rerun 
`gatsby develop`
```

then, refresh the `World History` category page which URL is:

> http://localhost:8000/category/c-world-history/

you will see a new tutorial card appeared at the bottom of this page rather than the text you saw before you refresh this page:

![new tuto in cate](/img/new-tuto-in-category.png)

Want to see your new tutorial details? just click on `Learn More...` in the card. Everything is ready for you to modify and update. All you have to do is to review those `.md` file and make what you want.


#### __Use Quiz Generator__

Quiz usually is not necessary for a normal reader, but if you want recognize some students achievement, and issue a certificate to him/she, quiz will come in handy. Let's see how to create a quiz.

Again, execute the generate command:

> $ npm run generate

This time we move `Down Arrow key` to select `Quiz-generate`:

![generate quiz](/img/generate-quiz.png)

Press `Enter` key start creating a template quiz, title can by igonre by the second `Enter`:

![gen quiz title](/img/gen-quiz-title.png)

Then we come to the category selection step, the cursor stop at the `business` directory, move down to select `c-world-history` directory which was created in previous step:

![gen quiz select cate](/img/gen-quiz-select-cate.png)

`Enter` in this category, now the only tutorial we've created `t-a-brief-history-of-europe` is selected:

![gen quiz intut](/img/gen-quiz-in-tut.png)

```
Note:

Please make sure you select the RIGHT tutorial directory to Enter in, if select wrongly you may override previously created quiz content while you have multiple tutorials in one category.
```

`Enter` in this tutorial, we'll put new quiz content in a tutorial folder since we assign a test to a tutorial conventionally.

![gen quiz in tuto](/img/gen-quiz-in-tuto.png)

Select `choose this directory` option which represents the tutorial directory `t-a-brief-history-of-europe`, press `Enter` key to complete a quiz template creation.

Let's have a look at what's added in the source file tree?

[![quiz source file](/img/test-in-tutorial.png)](javascript:void(0))

A `test.md` file created at the tutorial directory, when you open the file you'll find it including 4 dummy single choice questions as a start point for your own quiz. In the [Learning Precedures](#learning-precedures) we'll explain where to use this quiz.

### Step 4 Deploy website to netlify

In deployment phase, we divide this process into two big steps, in one step we upload our ultronele code and content to github, in another step we make netlify pull our ultronele repository hosted github, then netflify would deploy and start it as a new website.

#### Upload project to github

Our custom ultronele may by precious so we need keep it for a long time. Github is a good place to save your code/docs/files, as well as a cloud service for you to host and syncronize code with other service like [netlify](https://www.netlify.com/).

```
Note: if you dont want the project name hello-world, you can name it my-ultronele or other cool name.
```

First, follow the official github help to [Create a repo](https://help.github.com/en/articles/create-a-repo) in 6 step. But, we DONT need the 5th step to __Initialize this repository with a README.__ for we already had one in our ultronele.


Then, in your console window which just created tutorial/quiz, using the following commands to upload our ultronele to github:


> $ git init

> $ git add .

> $ git commit -m "first commit"

> $ git remote add origin https://github.com/RobinLi/hello-world.git

> $ git push -u origin master

```
Note: in the 4th command we add origin ...RobinLi..., here we need to replace RobinLi with your github account name! Besides, if you name your new github repository as `my-ultronele` rather than `hello-world`, then you need to match the name with the one in this command before `.git`.
```

#### Synchronize the repository to netlify

Now that our website is ready to launch, then we use netlify to build and bring it to alive online. Let's have a look at how to do it.

In prerequisites phase, you created a netlify account. Now, login your netlify apps: https://app.netlify.com/

...

### Step 5 Custom website config and navigation menu

#### Custom navigation menu page

...

#### Custom website logo

...

#### Custom website metadata

...

#### Custom website footer

...

#### Custom website theme color

...

### Step 6 Update content and new version of Ultronele

Use theme?

coming soon...

## Learning Precedures

...

### Step 1

...

### Step 2

...

### Step 3

...


## FAQs

Q: ...?

A: ...

Q: ...?

A: ...

Q: ...?

A: ...


## Tech Support


Email: lwz7512@gmail.com, response in 24hrs

Twitter: https://twitter.com/runbytech, response in 6hrs

Premium member: response immediately

