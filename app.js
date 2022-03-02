require("dotenv").config();

const colors = require("colors");
const {
    readInput,
    inquirerMenu,
    pause,
    listPlaces,
} = require("./helpers/inquirer");
const Search = require("./models/search");

const main = async() => {
    const search = new Search();
    let option;

    do {
        option = await inquirerMenu();

        switch (option) {
            case 1:
                // Show message
                const city = await readInput("Ciudad:");

                // Search list of matching places
                const cities = await search.searchCity(city);
                const id = await listPlaces(cities);
                if (id !== 0) {
                    const citySel = cities.find((city) => city.id === id);

                    search.addHistory(citySel.name);

                    const weather = await search.weatherCity(
                        citySel.lat,
                        citySel.lng
                    );

                    // Show city information
                    console.log("\nInformación de la cuidad\n".green);
                    console.log("Cuidad:", citySel.name);
                    console.log("Lat:", citySel.lat);
                    console.log("Lng:", citySel.lng);
                    console.log("Temperatura:", weather.temp);
                    console.log("Mínima", weather.max);
                    console.log("Máxima:", weather.min);
                    console.log("Descripción:", weather.desc);
                }
                break;
            case 2:
                search.capitalizedHistory.forEach((city, i) =>
                    console.log(`${colors.green(i + 1)}${".".green} ${city}`)
                );
                break;
        }

        if (option !== 0) await pause();
    } while (option !== 0);
};

main();