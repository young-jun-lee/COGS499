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
        "Artificial Intelligence": { primary: "#6f4979", secondary: "#895A95", tertiary: "#F5F1F7", core: ["CISC 251"], options: ["CISC 352"], supporting: ["CISC 102", ["MATH 110/111/112", "MATH 110", "MATH 111", "MATH 112"], ["MATH 120/121/123/124", "MATH 120", "MATH 121", ["MATH 123", "MATH 124"]]] },
        "Biomedical Computation": { primary: "#066360", secondary: "#099C97", tertiary: "#E4FDFD", core: ["CISC 251"], options: ["CISC 352"], supporting: ["CISC 102", ["MATH 110/111/112", "MATH 110", "MATH 111", "MATH 112"], ["MATH 120/121/123/124", "MATH 120", "MATH 121", "MATH 123", "MATH 124"]] },
        "Data Analytics": { primary: "#884900", secondary: "#BF6600", tertiary: "#FFF3E4", core: ["CISC 251"], options: ["CISC 352"], supporting: ["CISC 102", ["MATH 110/111/112", "MATH 110", "MATH 111", "MATH 112"], ["MATH 120/121/123/124", "MATH 120", "MATH 121", "MATH 123", "MATH 124"]] },
        "Fundamental Computation": { primary: "#30378f", secondary: "#3B42B0", tertiary: "#EEEFF9", core: ["CISC 251"], options: ["CISC 352"], supporting: ["CISC 102", ["MATH 110/111/112", "MATH 110", "MATH 111", "MATH 112"], ["MATH 120/121/123/124", "MATH 120", "MATH 121", "MATH 123", "MATH 124"]] },
        "Game Development": { primary: "#5d2e8f", secondary: "#7339B1", tertiary: "#F3EEF9", core: ["CISC 251"], options: ["CISC 352"], supporting: ["CISC 102", ["MATH 110/111/112", "MATH 110", "MATH 111", "MATH 112"], ["MATH 120/121/123/124", "MATH 120", "MATH 121", "MATH 123", "MATH 124"]] },
        "Security": { primary: "#0f6700", secondary: "#18A000", tertiary: "#E6FFE2", core: ["CISC 251"], options: ["CISC 352"], supporting: ["CISC 102", ["MATH 110/111/112", "MATH 110", "MATH 111", "MATH 112"], ["MATH 120/121/123/124", "MATH 120", "MATH 121", "MATH 123", "MATH 124"]] },
        // COMPUTING SPECIALIZATION
        "Biomedical Computing": {
            primary: "#066360", secondary: "#099C97", tertiary: "#E4FDFD", core:
                ["BIOL 102", "BIOL 103", "CHEM 112",
                    ["MATH 120/121/123/124", "MATH 120", "MATH 121", ["MATH 123", "MATH 124"]],
                    "CISC 223", "CISC 271", "BIOL 205", "BCHM 218", "CISC 330", "CISC 352", "CISC 365", ["BCHM 315/ BIOL 334", "BCHM 315", "BIOL 334"],
                    "BIOL 331", ["M-Level Reqs",
                        ["CISC 332", "CISC 320", "CISC 471"],
                        ["CISC 332", "CISC 320", "CISC 472"],
                        ["CISC 332", "CISC 471", "CISC 472"],
                        ["CISC 320", "CISC 471", "CISC 472"]
                    ]
                ], options: ["CISC 352"], supporting: ["CISC 102", ["MATH 110/111/112", "MATH 110", "MATH 111", "MATH 112"], ["MATH 120/121/123/124", "MATH 120", "MATH 121", "MATH 123", "MATH 124"]]
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
            , options: ["CISC 352"], supporting: ["CISC 102", ["MATH 110/111/112", "MATH 110", "MATH 111", "MATH 112"], ["MATH 120/121/123/124", "MATH 120", "MATH 121", "MATH 123", "MATH 124"]]
        },
        "Computer Science": {
            primary: "#002452", secondary: "#003E8F", tertiary: "#E0EEFF", core:
                [

                ],
            options: ["CISC 352"], supporting: ["CISC 102", ["MATH 110/111/112", "MATH 110", "MATH 111", "MATH 112"], ["MATH 120/121/123/124", "MATH 120", "MATH 121", "MATH 123", "MATH 124"]]
        },
        "COCA": {
            primary: "#327d26", secondary: "#41A332", tertiary: "#EEF9EC", core: ["CISC 251"], options: ["COCA 201",
                "CISC 223",
                "CISC 325",
                "CISC 352",
                "CISC 365",
            ], supporting: ["CISC 102", ["MATH 110/111/112", "MATH 110", "MATH 111", "MATH 112"], ["MATH 120/121/123/124", "MATH 120", "MATH 121", "MATH 123", "MATH 124"]]
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
            , options: ["CISC 352"], supporting: ["CISC 102", ["MATH 110/111/112", "MATH 110", "MATH 111", "MATH 112"], ["MATH 120/121/123/124", "MATH 120", "MATH 121", "MATH 123", "MATH 124"]]
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
            options: ["CISC 352"], supporting: ["CISC 102", ["MATH 110/111/112", "MATH 110", "MATH 111", "MATH 112"], ["MATH 120/121/123/124", "MATH 120", "MATH 121", "MATH 123", "MATH 124"]]
        },
    }

}
