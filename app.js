require("dotenv").config();

require("colors");
const { readInput, inquirerMenu, pause } = require("./helpers/inquirer");
const Search = require("./models/search");

const main = async() => {
    const search = new Search();
    let option = 0;

    do {
        option = await inquirerMenu();

        switch (option) {
            case 1:
                // Show message
                const city = await readInput("Ciudad:");

                // Search list of matching places
                const cities = await search.searchCity(city);
                console.log(cities);

                // Select a place

                // Show city information
                console.log("\nInformación de la cuidad\n".green);
                console.log("Cuidad:");
                console.log("Lat:");
                console.log("Lng:");
                console.log("Temperatura:");
                console.log("Mínima");
                console.log("Máxima:");

                break;
        }

        if (option !== 0) await pause();
    } while (option !== 0);
};

main();