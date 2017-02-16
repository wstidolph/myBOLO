import * as Schema from '../src/app/model';

export const dbData = {
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
  ],
  "watches": [
    {
      "url": "wayne",
      "taxonomyKey":"1.0",
      "noticeableKey": "2",
      "description": "AMBER",
      "iconUrl": "",
      "watchListIcon": "",
      "longDescription": "",
      "olc_in": ["848VXXWP+GF"], // 420 Isbel Dr
      "olc_ex":[""],
      "location": "",
      "timeStart":"",
      "timeEnd":"",
      "notices": []
    },
    {
      "url": "forest_fire",
      "taxonomyKey":"2.0",
      "noticeableKey": "1",
      "description":"Forest Fire",
      "longDescription":"",
      "iconUrl": "",
      "watchListIcon": "",
      "olc_in":[""], // OLC include
            // open location code https://en.wikipedia.org/wiki/Open_Location_Code
            // also see https://plus.codes/
      "olc_ex":[""], // OLC exclude from union of the olc_in entries
      "location": "",
      "timeStart":"",
      "timeEnd":"",
      "notices": []
    },
    {
      "url": "camp_fire",
      "taxonomyKey":"2.0",
      "noticeableKey": "2",
      "description":"Camp Fire",
      "longDescription":"",
      "iconUrl": "",
      "watchListIcon": "",
      "olc_in":[""],
      "olc_ex":[""],
      "location": "",
      "timeStart":"",
      "timeEnd":"",
      "notices": []
    },
    {
      "url": "fish_1",
      "taxonomyKey":"3.0",
      "noticeableKey": "2",
      "description": "icythy-something",
      "iconUrl": "",
      "watchListIcon": "",
      "longDescription": "icthy description of this particular fish",
      "olc_in":[""],
      "olc_ex":[""],
      "location": "",
      "timeStart":"",
      "timeEnd":"",
      "notices": []
    }
  ],
  "watchsets": [
    {
      "ownerKey":"",
      "description":"Marine Watch 2016",
      "longDescription":"Various fish to watch for on the group outing",
      "watchKeyList":[0,1],
      "startTime":"",
      "endTime":"",
      "olc_in":[""], // union of watches
      "olc_ex":[""]  // union of watches
    },
    {
      "ownerKey":"",
      "description":"Second WatchSet",
      "longDescription":"another group of things to watch",
      "watchKeyList":[2,3,1],
      "startTime":"",
      "endTime":"",
      "olc_in":[""], // union of watches
      "olc_ex":[""]  // union of watches
    }
  ],
  "userProfile" : [{
    "authKey":"UNK",
    "firstName": "Wayne",
    "lastName": "Ali",
    "email": "wayne@stidolph.com",
    "watchSets": [0],
    "watchSetCount": 1,
    "watches":[
      {
        "watchKey":"watchSetKey"
      }
    ]
  }
  ],
  "notices": [{
    "uid": 0,
    "watch": 0,
    "seenWhen": Date.now().toString()
  },
    {
      "uid": 0,
      "watch": 2,
      "seenWhen": Date.now().toString()
    }]
};
