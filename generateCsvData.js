import fs from "fs";
import * as constants from "./constants.js"

const CSV_HEADER = "price;description;address_line_1;address_line_2;city;state;country;postal_code;house_details;farm_details;photos\n"

function format(...args) {
    return args.join(";") + '\n';
}

// range [min, max)
function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

fs.writeFileSync("data.csv", CSV_HEADER);

for(let i = 0; i < 30; i++) {
    const isHouse = Boolean(randomNumberInRange(0,2));

    const text = format(
        randomNumberInRange(50,1000) * 1000,
        constants.DESCRIPTION,
        constants.ADDRESS_LINE_1[randomNumberInRange(0,3)],
        constants.ADDRESS_LINE_2[randomNumberInRange(0,3)],
        constants.CITY[randomNumberInRange(0,3)],
        constants.STATE[randomNumberInRange(0,3)],
        constants.COUNTRY,
        constants.POSTAL_CODE,
        isHouse ? constants.HOUSE_DETAILS[randomNumberInRange(0,constants.HOUSE_DETAILS.length)] : null,
        isHouse ? null : constants.FARM_DETAILS[randomNumberInRange(0,constants.FARM_DETAILS.length)],
        JSON.stringify(constants.PHOTOS[randomNumberInRange(0,3)]),

    )
    fs.appendFile("data.csv", text, {} , (err) => {
        if(err) throw err;
    });
}