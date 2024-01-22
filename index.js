const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

let team = [];

// TODO: Write Code to gather information about the development team members, and render the HTML file.
const promptManager = async () => {
    const managerAnswers = await inquirer.prompt([
        {
            type: 'input',
            message: "Please enter the team manager's name.",
            name:'managerName',
        },
        {
            type: 'input',
            message: "Enter the team manager's employee ID.",
            name:'managerId',
        },
        {
            type: 'input',
            message: "Enter the team manager's email address.",
            name:'managerEmail',
        },
        {
            type: 'input',
            message: "Enter the team manager's office number.",
            name:'managerOfficeNumber',
        },
    ]);

    const manager = new Manager(managerAnswers.managerName, managerAnswers.managerId, managerAnswers.managerEmail, managerAnswers.managerOfficeNumber)
    
    team.push(manager);
    console.log('Manager added:', managerAnswers);
    return promptMenu();
}

const promptEngineer = async () => {
    const engineerAnswers = await inquirer.prompt([
        {
            type: 'input',
            message: "Enter the engineer's name.",
            name:'engineerName',
        },
        {
            type: 'input',
            message: "Enter the engineer's ID.",
            name:'engineerId',
        },
        {
            type: 'input',
            message: "Enter the engineer's email.",
            name:'engineerEmail',
        },
        {
            type: 'input',
            message: "Enter the engineer's GitHub username.",
            name:'engineerGithub',
        },
    ])

    const engineer = new Engineer (engineerAnswers.engineerName, engineerAnswers.engineerId, engineerAnswers.engineerEmail, engineerAnswers.engineerGithub)

    team.push(engineer);
    console.log('Engineer added:', engineerAnswers);
    return promptMenu();
}

const promptIntern = async () => {
    const internAnswers = await inquirer.prompt([
        {
            type: 'input',
            message: "Enter the intern's name.",
            name:'internName',
        },
        {
            type: 'input',
            message: "Enter the intern's ID.",
            name:'internId',
        },
        {
            type: 'input',
            message: "Enter the intern's email.",
            name:'internEmail',
        },
        {
            type: 'input',
            message: "Enter the intern's School.",
            name:'internSchool',
        },
    ])

    const intern = new Intern (internAnswers.internName, internAnswers.internId, internAnswers.internEmail, internAnswers.internSchool)
   
    team.push(intern);
    console.log('Intern added:', internAnswers);
    return promptMenu();
}

const promptMenu = async () => {
    const chosenOption = await inquirer.prompt([
        {
            type: 'list',
            message: "Select one of the following options.",
            name:'menuOption',
            choices: ['Add an engineer', 'Add an intern', 'Finish building the team'],
        },
    ])

    if (chosenOption.menuOption === 'Add an engineer') {
        await promptEngineer();
    } else if (chosenOption.menuOption === "Add an intern") {
        await promptIntern();
    } else {
        console.log('Team:', team);
        return;
    }
}

// Function to write HTML file
function writeToFile(fileName, data) {
    outputPath = path.join(OUTPUT_DIR, fileName);
    fs.writeFile(outputPath, data, (err) => 
    err? console.error(err) : console.log('Success! File written to:', outputPath)
    );
}

promptManager().then(() => {
    console.log('Team building completed!')
    let htmlContents = render.generateTeam(team);
    console.log(htmlContents);
    writeToFile("team.html", htmlContents);
})