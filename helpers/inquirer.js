const colors = require('colors');
const inquirer = require('inquirer');

const questions = [{
    type: "list",
    name: "option",
    message: "¿Qué desea hacer?",
    choices: [{
            value: 1,
            name: `${'1.'.green} Buscar cuidad`,
        },
        {
            value: 2,
            name: `${'2.'.green} Historial`,
        },
        {
            value: 0,
            name: `${'0.'.green} Salir`,
        },
    ],
}, ];

const inquirerMenu = async() => {
    console.clear();
    console.log("===============================".green);
    console.log("     Seleccione una opción".white);
    console.log("===============================\n".green);

    const { option } = await inquirer.prompt(questions);
    return option;
}

const pause = async() => {
    const question = [{
        type: "input",
        name: "pause",
        message: `Presione ${"enter".green} para continuar`,
    }, ];

    console.log();
    await inquirer.prompt(question);
}

const readInput = async(message) => {
    const question = [{
        type: 'input',
        name: 'typed',
        message,
        validate(value) {
            if (value.length === 0)
                return 'Por favor ingrese un valor';
            return true;
        }
    }];

    const { typed } = await inquirer.prompt(question);
    return typed;
}

const listPlaces = async(places = []) => {
    const choices = places.map((place, i) => {
        return {
            value: place.id,
            name: `${colors.green(i + 1)}${".".green} ${place.name}`,
        };
    });

    choices.unshift({
        value: 0,
        name: `${"0.".red} ${"Cancelar".red}`,
    });

    const questions = [{
        type: "list",
        name: "id",
        message: "Seleccione un lugar:",
        choices,
    }, ];

    const { id } = await inquirer.prompt(questions);
    return id;
};

const tasksCheckList = async(tasks = []) => {
    const choices = tasks.map((task, i) => {
        return {
            value: task.id,
            name: `${colors.green(i + 1)}${".".green} ${task.description}`,
            checked: task.done ? true : false,
        };
    });

    const question = [{
        type: "checkbox",
        name: "ids",
        message: "Selecciones: ",
        choices,
    }, ];

    const { ids } = await inquirer.prompt(question);
    return ids;
};

const confirm = async(message) => {
    const question = [{
        type: "confirm",
        name: "ok",
        message,
    }, ];

    const { ok } = await inquirer.prompt(question);
    return ok;
};

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listPlaces,
    tasksCheckList,
    confirm,
};