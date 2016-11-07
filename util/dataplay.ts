/**
 * Created by wayne on 10/7/2016.
 */

//import {dbData} from "./db-data";

const dbData = {
    "noticables": [
        { "taxonomyKey":"1.0",
            "description": "AMBER",
            "longDescription": "Emergency person/vehicle watch"
        },
        {
            "taxonomyKey":"2.0",
            "description": "FIRE",
            "longDescription": "combustion or burning, in which substances combine chemically with oxygen from the air and typically give out bright light, heat, and smoke.",
        },
        {
            "taxonomyKey":"3.0",
            "description": "FISH",
            "longDescription": "water-dwelling limbless cold-blooded vertebrate animal with gills and fins",
        }
    ]};

let D:any[] = [];

dbData.noticables.forEach(noticeable => {
    const noticeableRef = D.push({
        taxonomyKey: noticeable.taxonomyKey,
        description: noticeable.description,
        longDescription: noticeable.longDescription
    })
});

console.log(D);

