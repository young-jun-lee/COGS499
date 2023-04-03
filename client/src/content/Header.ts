export default {
    title: 'Hitchhiker\'s Guide to Computing Degree Plans',
    // title: 'HITCHHIKER\'S GUIDE TO COMPUTING DEGREE PLANS',
    subheading1: 'Welcome!',
    subheading2: 'As you fill in the courses you have already taken, you will be informed what courses you still need to graduate.',
    subheading3: 'Happy Planning!',
    preloadedCourses: ["APSC", "ARTH", "BADR", "BCHM", "BIOL", "BIOM", "CHEE", "CHEM", "CISC", "COCA", "COGS", "COMM", "DRAM", "ECON", "ELEC", "ENIN", "FILM", "GEOL", "GPHY", "KNPE", "LING", "MATH", "MECH", "MUSC", "MUTH", "NSCI", "NURS", "PHGY", "PHIL", "POLS", "PSYC", "SOCY", "SOFT", "STAM", "STAT", "WRIT"
    ],
    core: ["CISC 121", "CISC 124", ["STAT OPTIONS", "STAT 263", "STAT 268", "STAT 351", 'BIOL 243', 'CHEE 209', 'COMM 162', 'ECON 250', 'GPHY 247', 'KNPE 251', 'NURS 323', 'POLS 385', 'PSYC 202', 'SOCY 211', 'STAM 200', 'STAT 263', 'STAT 367'], "CISC 203", "CISC 204", "CISC 221", "CISC 223", "CISC 235", ["CISC 322/326", "CISC 322", "CISC 326"], "CISC 324", "CISC 360", "CISC 365", "CISC 497", ["CISC 496/499/500", "CISC 496", "CISC 499", "CISC 500"]],
    supporting: ["CISC 102", ["LINEAR ALGEBRA OPTIONS", "MATH 110", "MATH 111", "MATH 112"], ["CALCULUS OPTIONS", "MATH 120", "MATH 121", "MATH 123", "MATH 124"]],
    option: ["COGS 100", "COGS 201", "CISC 352", ["AI OPTIONS", "CISC 452", "CISC 453", "CISC 455", "CISC 467", "CISC 473", "CISC 474"]],

    specializations: {
        "Artificial Intelligence": {
            primary: "#6f4979", secondary: "#895A95", tertiary: "#F5F1F7",
        },
        "Biomedical Computation": { primary: "#066360", secondary: "#099C97", tertiary: "#E4FDFD" },
        "Data Analytics": { primary: "#884900", secondary: "#BF6600", tertiary: "#FFF3E4" },
        "Fundamental Computation": { primary: "#30378f", secondary: "#3B42B0", tertiary: "#EEEFF9" },
        "Game Development": { primary: "#5d2e8f", secondary: "#7339B1", tertiary: "#F3EEF9" },
        "Security": { primary: "#0f6700", secondary: "#18A000", tertiary: "#E6FFE2" },
        "Biomedical Computing": { primary: "#066360", secondary: "#099C97", tertiary: "#E4FDFD" },
        "Cognitive Science": { primary: "#6f4979", secondary: "#895A95", tertiary: "#F5F1F7" },
        "Computer Science": { primary: "#002452", secondary: "#003E8F", tertiary: "#E0EEFF" },
        "COCA": { primary: "#327d26", secondary: "#41A332", tertiary: "#EEF9EC" },
        "COMA": { primary: "#a01f62", secondary: "#C52678", tertiary: "#FBECF4" },
        "Software Design": { primary: "#005c92", secondary: "#007EC8", tertiary: "#E5F6FF" },
    }

}
