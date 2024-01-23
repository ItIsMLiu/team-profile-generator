const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const render = require("./src/page-template.js");

let teams = [];

// TODO: Write Code to gather information about the development team members, and render the HTML file.
const promptManager = async () => {
    const managerAnswers = await inquirer.prompt([
        {
            type: 'input',
            message: "Please enter the team manager's name.",
            name:'managerName',
            validate: (input) => {
                return input !== '' ? true : "Name cannot be empty";
            }
        },
        {
            type: 'input',
            message: "Enter the team manager's employee ID.",
            name:'managerId',
            validate: (input) => {
                return input !== '' && !isNaN(input) ? true : "Please enter a valid employee ID (numeric only)";
            }
        },
        {
            type: 'input',
            message: "Enter the team manager's email address.",
            name:'managerEmail',
            validate: (input) => {
                return input !== "" ? true : "Email cannot be empty";
            }
        },
        {
            type: 'input',
            message: "Enter the team manager's office number.",
            name:'managerOfficeNumber',
            validate: (input) => {
                return input !== '' && !isNaN(input) ? true : "Please enter a valid office number (numeric only)";
            }
        },
    ]);

    const manager = new Manager(managerAnswers.managerName, managerAnswers.managerId, managerAnswers.managerEmail, managerAnswers.managerOfficeNumber)
    
    teams.push(manager);
    console.log('Manager added:', managerAnswers);
    return promptMenu();
}

const promptEngineer = async () => {
    const engineerAnswers = await inquirer.prompt([
        {
            type: 'input',
            message: "Enter the engineer's name.",
            name:'engineerName',
            validate: (input) => {
                return input !== '' ? true : "Name cannot be empty";
            }
        },
        {
            type: 'input',
            message: "Enter the engineer's ID.",
            name:'engineerId',
            validate: (input) => {
                return input !== '' && !isNaN(input) ? true : "Please enter a valid employee ID (numeric only)";
            }
        },
        {
            type: 'input',
            message: "Enter the engineer's email.",
            name:'engineerEmail',
            validate: (input) => {
                return input !== "" ? true : "Email cannot be empty";
            }
        },
        {
            type: 'input',
            message: "Enter the engineer's GitHub username.",
            name:'engineerGithub',
            validate: (input) => {
                return input !== "" ? true : "GitHub username cannot be empty";
            }
        },
    ])

    const engineer = new Engineer (engineerAnswers.engineerName, engineerAnswers.engineerId, engineerAnswers.engineerEmail, engineerAnswers.engineerGithub)

    teams.push(engineer);
    console.log('Engineer added:', engineerAnswers);
    return promptMenu();
}

const promptIntern = async () => {
    const internAnswers = await inquirer.prompt([
        {
            type: 'input',
            message: "Enter the intern's name.",
            name:'internName',
            validate: (input) => {
                return input !== '' ? true : "Name cannot be empty";
            }
        },
        {
            type: 'input',
            message: "Enter the intern's ID.",
            name:'internId',
            validate: (input) => {
                return !isNaN(input) ? true : "Please enter a valid employee ID (numeric only)";
            }
        },
        {
            type: 'input',
            message: "Enter the intern's email.",
            name:'internEmail',
            validate: (input) => {
                return input !== "" ? true : "Email cannot be empty";
            }
        },
        {
            type: 'input',
            message: "Enter the intern's School.",
            name:'internSchool',
            validate: (input) => {
                return input !== "" ? true : "School cannot be empty";
            }
        },
    ])

    const intern = new Intern (internAnswers.internName, internAnswers.internId, internAnswers.internEmail, internAnswers.internSchool)
   
    teams.push(intern);
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
        console.log('Team:', teams);
        return;
    }
}

// Function to write HTML file
function writeToFile(fileName, data) {
    const OUTPUT_DIR = path.resolve(__dirname, "output");

    // checking if the output folder exists, and create it if not
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }

    const outputPath = path.join(OUTPUT_DIR, fileName);
    fs.writeFile(outputPath, data, (err) => 
    err? console.error(err) : console.log('Success! File written to:', outputPath)
    );
}

promptManager().then(() => {
    console.log('Team building completed!')
    // call render function
    let htmlContents = render(teams);
    // call writeToFile function with filename and contents
    writeToFile("team.html", htmlContents);
})