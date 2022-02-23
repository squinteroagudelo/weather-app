require('colors');
const { readInput, inquirerMenu, pause } = require('./helpers/inquirer');

const main = async() => {

    let option = 0;

    do {

        option = await inquirerMenu();
        console.log(option);

        if (option !== 0) await pause();

    } while (option !== 0);

}

main();