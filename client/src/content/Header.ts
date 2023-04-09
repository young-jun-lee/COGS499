export default {
    title: 'Hitchhiker\'s Guide to Computing Degree Plans',
    subheading1: 'Welcome!',
    subheading2: 'As you fill in the courses you have already taken, you will be informed what courses you still need to graduate.',
    subheading3: 'Happy Planning!',
    preloadedCourses: ["APSC", "ARTH", "BADR", "BCHM", "BIOL", "BIOM", "CHEE", "CHEM", "CISC", "COCA", "COGS", "COMM", "DRAM", "ECON", "ELEC", "ENIN", "FILM", "GEOL", "GPHY", "KNPE", "LING", "MATH", "MECH", "MUSC", "MUTH", "NSCI", "NURS", "PHGY", "PHIL", "POLS", "PSYC", "SOCY", "SOFT", "STAM", "STAT", "WRIT"
    ],
    compMajors: ["Artificial Intelligence", "Biomedical Computation", "Data Analytics", "Fundamental Computation", "Game Development", "Security"],
    compSpecs: ["Biomedical Computing", "Cognitive Science", "Computer Science", "COCA", "COMA", "Software Design"],
    commonMajorCore: ["CISC 121", "CISC 124", ["STAT Options", "STAT 263", "STAT 268", "STAT 351", 'BIOL 243', 'CHEE 209', 'COMM 162', 'ECON 250', 'GPHY 247', 'KNPE 251', 'NURS 323', 'POLS 385', 'PSYC 202', 'SOCY 211', 'STAM 200', 'STAT 263', 'STAT 367'], "CISC 203", "CISC 204", "CISC 221", "CISC 223", "CISC 235", ["CISC 322/326", "CISC 322", "CISC 326"], "CISC 324", "CISC 360", "CISC 365", "CISC 497", ["CISC 496/499/500", "CISC 496", "CISC 499", "CISC 500"]],
    commonSpecCore: [
        "CISC 121",
        "CISC 124",
        ["Discrete Math", ["CISC 102", "MATH 111"], ["CISC 102", "MATH 112"], "MATH 110"],
        ["STAT Options", "STAT 263", "STAT 268", "STAT 351", 'BIOL 243', 'CHEE 209', 'COMM 162', 'ECON 250', 'GPHY 247', 'KNPE 251', 'NURS 323', 'POLS 385', 'PSYC 202', 'SOCY 211', 'STAM 200', 'STAT 263', 'STAT 367'],
        "CISC 203",
        "CISC 204",
        "CISC 221",
        "CISC 235",
        "CISC 360",
        "CISC 497",
        ["CISC 496/499/500", "CISC 496", "CISC 499", "COGS 499", "CISC 500"]
    ],
    commonMajorSupporting: [
        ["Discrete Math", ["CISC 102", "MATH 111"], ["CISC 102", "MATH 112"], "MATH 110"],
        ["MATH 120/121/123/124", "MATH 120", "MATH 121", ["MATH 123", "MATH 124"]],
    ],

    // supporting: ["CISC 102", ["MATH 110/111/112", "MATH 110", "MATH 111", "MATH 112"], ["MATH 120/121/123/124", "MATH 120", "MATH 121", "MATH 123", "MATH 124"]],
    // option: ["COGS 100", "COGS 201", "CISC 352", ["AI Options", "CISC 452", "CISC 453", "CISC 455", "CISC 467", "CISC 473", "CISC 474"]],


    specializations: {
        // COMPUTING MAJOR
        "Artificial Intelligence": {
            primary: "#6f4979", secondary: "#895A95", tertiary: "#F5F1F7", core: [], options: [
                "COGS 100", "COGS 201", "CISC 352", ["AI Options",
                    ['CISC 452', 'CISC 453'],
                    ['CISC 452', 'CISC 455'],
                    ['CISC 452', 'CISC 467'],
                    ['CISC 452', 'CISC 473'],
                    ['CISC 452', 'CISC 474'],
                    ['CISC 453', 'CISC 455'],
                    ['CISC 453', 'CISC 467'],
                    ['CISC 453', 'CISC 473'],
                    ['CISC 453', 'CISC 474'],
                    ['CISC 455', 'CISC 467'],
                    ['CISC 455', 'CISC 473'],
                    ['CISC 455', 'CISC 474'],
                    ['CISC 467', 'CISC 473'],
                    ['CISC 467', 'CISC 474'],
                    ['CISC 473', 'CISC 474'],
                ],
                ['Options at 200+', "CISC 2++", "COCA 2++", "COGS 2++", "SOFT 2++"]
            ], supporting: []
        },
        "Biomedical Computation": {
            primary: "#066360", secondary: "#099C97", tertiary: "#E4FDFD", core: [], options: [
                "CISC 271", "CISC 330", "CISC 352", "CISC 472", ["CISC 320", "CISC 471"], ["Options at 200+", "CISC 2++", "COCA 2++", "COGS 2++", "SOFT 2++"]
            ], supporting: []
        },
        "Data Analytics": { primary: "#884900", secondary: "#BF6600", tertiary: "#FFF3E4", core: [], options: ["CISC 271", "CISC 371", "CISC 372", "CISC 451", "CISC 452", ["Options at 200+", "CISC 2++", "COCA 2++", "COGS 2++", "SOFT 2++"]], supporting: [] },
        "Fundamental Computation": {
            primary: "#30378f", secondary: "#3B42B0", tertiary: "#EEEFF9", core: [], options: [
                ["CISC 422/455/462/465/466/467", "CISC 422", "CISC 455", "CISC 462", "CISC 465", "CISC 466", "CISC 467"],
                ["CISC SUB OPTIONS", "COMM 365",
                    "ELEC 470",
                    "ELEC 474",
                    "MATH 272",
                    "MATH 337",
                    "MATH 401",
                    "MATH 402",
                    "MATH 434",
                    "MATH 474"],
                ["Options at 200+", "CISC 2++", "COCA 2++", "COGS 2++", "SOFT 2++"]

            ], supporting: []
        },
        "Game Development": { primary: "#5d2e8f", secondary: "#7339B1", tertiary: "#F3EEF9", core: [], options: ["CISC 226", "CISC 320", "CISC 352", "CISC 454", "CISC 486", ["Options at 200+", "CISC 2++", "COCA 2++", "COGS 2++", "SOFT 2++"]], supporting: [] },
        "Security": { primary: "#0f6700", secondary: "#18A000", tertiary: "#E6FFE2", core: [], options: ["CISC 220", "CISC 327", "CISC 335", "CISC 447", ["CISC 434/448/468", "CISC 434", "CISC 448", "CISC 468"], ["Options at 200+", "CISC 2++", "COCA 2++", "COGS 2++", "SOFT 2++"]], supporting: [] },

        // COMPUTING SPECIALIZATION
        "Biomedical Computing": {
            primary: "#066360", secondary: "#099C97", tertiary: "#E4FDFD",
            core:
                ["BIOL 102", "BIOL 103", "CHEM 112",
                    ["MATH 120/121/123/124", "MATH 120", "MATH 121", ["MATH 123", "MATH 124"]],
                    "CISC 223", "CISC 271", "BIOL 205", "BCHM 218", "CISC 330", "CISC 352", "CISC 365", ["BCHM 315/ BIOL 334", "BCHM 315", "BIOL 334"],
                    "BIOL 331", ["M-Level Reqs",
                        ["CISC 332", "CISC 320", "CISC 471"],
                        ["CISC 332", "CISC 320", "CISC 472"],
                        ["CISC 332", "CISC 471", "CISC 472"],
                        ["CISC 320", "CISC 471", "CISC 472"]
                    ]
                ],
            options:
                [["BMCO Options",
                    ["CHEM 281", "CHEM 282", "CHEM 285", "PHGY 215"],
                    ["CHEM 281", "CHEM 282", "CHEM 285", "PHGY 216"],
                    ["CHEM 281", "CHEM 282", "PHGY 215", "PHGY 216"],
                    ["CHEM 281", "CHEM 285", "PHGY 215", "PHGY 216"],
                    ["CHEM 282", "CHEM 285", "PHGY 215", "PHGY 216"],
                ]],
            supporting: ["18.0 Elective Units"]
        },
        "Cognitive Science": {
            primary: "#6f4979", secondary: "#895A95", tertiary: "#F5F1F7", core:
                [
                    "COGS 100", "COGS 201",
                    ["AI Options", [
                        ["CISC 352", "COGS 400", "CISC 453"],
                        ["CISC 352", "COGS 400", "CISC 455"],
                        ["CISC 352", "COGS 400", "CISC 473"],
                        ["CISC 352", "COGS 400", "CISC 474"],
                        ["CISC 352", "COGS 400", "CISC 467"],
                        ["CISC 352", "CISC 453", "CISC 455"],
                        ["CISC 352", "CISC 453", "CISC 473"],
                        ["CISC 352", "CISC 453", "CISC 474"],
                        ["CISC 352", "CISC 453", "CISC 467"],
                        ["CISC 352", "CISC 455", "CISC 473"],
                        ["CISC 352", "CISC 455", "CISC 474"],
                        ["CISC 352", "CISC 455", "CISC 467"],
                        ["CISC 352", "CISC 473", "CISC 474"],
                        ["CISC 352", "CISC 473", "CISC 467"],
                        ["CISC 352", "CISC 474", "CISC 467"],
                    ]],
                ]
            , options: [
                ["LING STREAM", [
                    ["LING 100", "LING 310", "LING 340", "LING 415"],
                    ["LING 100", "LING 320", "LING 340", "LING 415"],
                    ["LING 100", "LING 330", "LING 340", "LING 415"],
                ]],
                ["PSYC STREAM", [
                    ["PSYC 100", "PSYC 221", "PSYC 203", "PSYC 3XX"],
                    ["PSYC 100", "PSYC 221", "PSYC 271", "PSYC 3XX"],
                ]
                ],
                ["PHIL STREAM", [
                    ["PHIL 111", "PHIL 250", "PHIL 261"],
                    ["PHIL 111", "PHIL 250", "PHIL 270"],
                    ["PHIL 111", "PHIL 250", "PHIL 311"],
                    ["PHIL 111", "PHIL 250", "PHIL 351"],
                    ["PHIL 111", "PHIL 250", "PHIL 359"],
                    ["PHIL 111", "PHIL 250", "PHIL 381"],
                    ["PHIL 115", "PHIL 250", "PHIL 261"],
                    ["PHIL 115", "PHIL 250", "PHIL 270"],
                    ["PHIL 115", "PHIL 250", "PHIL 311"],
                    ["PHIL 115", "PHIL 250", "PHIL 351"],
                    ["PHIL 115", "PHIL 250", "PHIL 359"],
                    ["PHIL 115", "PHIL 250", "PHIL 381"],
                ]],
                ["COGS COMP OPTIONS"]
            ], supporting: ["24.0 Elective Units"]
        },
        "Computer Science": {
            primary: "#002452", secondary: "#003E8F", tertiary: "#E0EEFF", core:
                [

                ],
            options: ["CISC 352"], supporting: ["CISC 102", ["MATH 110/111/112", "MATH 110", "MATH 111", "MATH 112"], ["MATH 120/121/123/124", "MATH 120", "MATH 121", "MATH 123", "MATH 124"]]
        },
        "COCA": {
            primary: "#327d26", secondary: "#41A332", tertiary: "#EEF9EC", core: ["COCA 201",
                "CISC 223",
                "CISC 325",
                "CISC 352",
                "CISC 365",
            ], options: [
                ["COAR STREAM", [
                    ["ARTH 116", "ARTH 117", "ARTH 4XX", "ARTH 3XX", "ARTH 2XX"],
                    ["ARTH 116", "ARTH 120", "ARTH 4XX", "ARTH 3XX", "ARTH 2XX"],
                    ["ARTH 117", "ARTH 120", "ARTH 4XX", "ARTH 3XX", "ARTH 2XX"],

                ]
                ],
                ["CODR STREAM", [
                    ["BADR 100", "BADR 101", "DRAM 200", "DRAM 220", "DRAM 240", "DRAM 241"],
                    ["DRAM 100", "DRAM 200", "DRAM 220", "DRAM 240", "DRAM 242"],
                    ["DRAM 100", "DRAM 200", "DRAM 220", "DRAM 240", "DRAM 241"],
                    ["DRAM 100", "DRAM 200", "DRAM 220", "DRAM 240", "DRAM 242"],
                    ["DRAM 100", "DRAM 200", "DRAM 220", "DRAM 240", "DRAM 241"],
                ]],
                ["COFI STREAM", [
                    ["BADR 100", "FILM 104", "FILM 206", "FILM 216", "FILM 217", "FILM 218", "FILM 250"],
                    ["BADR 100", "FILM 104", "FILM 206", "FILM 216", "FILM 217", "FILM 226", "FILM 250"],
                    ["BADR 100", "FILM 104", "FILM 206", "FILM 216", "FILM 217", "FILM 236", "FILM 250"],
                    ["BADR 100", "FILM 104", "FILM 206", "FILM 216", "FILM 217", "FILM 240", "FILM 250"],
                    ["BADR 100", "FILM 104", "FILM 206", "FILM 216", "FILM 217", "FILM 260", "FILM 250"],

                    ["FILM 106", "FILM 104", "FILM 206", "FILM 216", "FILM 217", "FILM 218", "FILM 250"],
                    ["FILM 106", "FILM 104", "FILM 206", "FILM 216", "FILM 217", "FILM 226", "FILM 250"],
                    ["FILM 106", "FILM 104", "FILM 206", "FILM 216", "FILM 217", "FILM 236", "FILM 250"],
                    ["FILM 106", "FILM 104", "FILM 206", "FILM 216", "FILM 217", "FILM 240", "FILM 250"],
                    ["FILM 106", "FILM 104", "FILM 206", "FILM 216", "FILM 217", "FILM 260", "FILM 250"],

                    ["FILM 110", "FILM 206", "FILM 216", "FILM 217", "FILM 218", "FILM 250"],
                    ["FILM 110", "FILM 206", "FILM 216", "FILM 217", "FILM 226", "FILM 250"],
                    ["FILM 110", "FILM 206", "FILM 216", "FILM 217", "FILM 236", "FILM 250"],
                    ["FILM 110", "FILM 206", "FILM 216", "FILM 217", "FILM 240", "FILM 250"],
                    ["FILM 110", "FILM 206", "FILM 216", "FILM 217", "FILM 260", "FILM 250"],
                ]],
                ["COMU STREAM", [
                    ["MUSC 104", "MUSC 156", "MUSC 255", "MUSC 191", "MUTH 110", "MUTH 111", "MUSC 210"],
                    ["MUSC 104", "MUSC 156", "MUSC 255", "MUSC 191", "MUTH 110", "MUTH 111", "MUSC 211"],
                    ["MUSC 105", "MUSC 156", "MUSC 255", "MUSC 191", "MUTH 110", "MUTH 111", "MUSC 210"],
                    ["MUSC 105", "MUSC 156", "MUSC 255", "MUSC 191", "MUTH 110", "MUTH 111", "MUSC 211"],
                ]],

            ], supporting: ["36.0 Elective Units"]
        },
        "COMA": {
            primary: "#a01f62", secondary: "#C52678", tertiary: "#FBECF4", core:
                [
                    "CISC 223",
                    ["CISC 322/ CISC 326", "CISC 322", "CISC 326"],
                    "CISC 324",
                    "CISC 365",
                    ["I-Level Reqs",
                        ["MATH 210", "MATH 211"],
                        ["MATH 210", "MATH 310"],
                        ["MATH 210", "MATH 413"],
                        ["MATH 210", "MATH 414"],
                        ["MATH 210", "MATH 311"],
                        ["MATH 211", "MATH 310"],
                        ["MATH 211", "MATH 413"],
                        ["MATH 211", "MATH 414"],
                        ["MATH 211", "MATH 311"],
                        ["MATH 310", "MATH 413"],
                        ["MATH 310", "MATH 414"],
                        ["MATH 310", "MATH 311"],
                        ["MATH 413", "MATH 414"],
                        ["MATH 413", "MATH 311"],
                        ["MATH 414", "MATH 311"],
                    ],
                    ["MATH 120/121/123/124", "MATH 120", "MATH 121", "MATH 123", "MATH 124"],
                    ["MATH 221/280", "MATH 221", "MATH 280"],
                ]
            , options: ["COMA Options"], supporting: ["36.0 Elective Units"]
        },
        "Software Design": {
            primary: "#005c92", secondary: "#007EC8", tertiary: "#E5F6FF", core:
                [["MATH 120/121/123/124", "MATH 120", "MATH 121", "MATH 123", "MATH 124"],
                    "CISC 223",
                    "CISC 324",
                    "CISC 365",
                    "CISC 325",
                    "CISC 327",
                    "CISC 423",
                    "CISC 422",
                ["CISC 322/326", "CISC 322", "CISC 326"],
                ],
            options: ["SOFT Dev Option", "GAME Dev Option"], supporting: ["12.0 Elective Units"]
        },
    }

}
