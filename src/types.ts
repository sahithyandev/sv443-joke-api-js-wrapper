// I moved the whole code from this file to index.ts
// Because when I built the project before, it built 6 files (3 files for each)
// I don't want that. I wanted to have all my code in 3 files only.
// One for code, one for declarations and one for map

// I searched on google how to do this, but couldn't find any solutions.
// I think webpack or something else is needed

// TK Fix this problem
// UPDATE: I am currently working on solving this problem.

export type Category =
    | "Programming"
    | "Miscellaneous"
    | "Dark"
    | "Pun"
    | "Spooky"
    | "Christmas";

export type Flag = "nsfw" | "religious" | "political" | "racist" | "sexist";

// for validation
export type strictRequestOptions = {
    categories: Category[] | "Any";
    responseFormat: "json" | "xml" | "yaml" | "plain";
    jokeType: "single" | "twopart" | "any";
    searchString: string;
    language: "cs" | "de" | "en" | "es";
    flags: "" | Flag[];
    idRange: {
        from: number;
        to: number;
    };
    amount: number;
};

// to get the input from the user
// all values are optional
// undefined values will be set to the default values
export type requestOptions = {
    categories?: Category[] | "Any"; // default 'Any'
    responseFormat?: "json" | "xml" | "yaml" | "txt"; // default 'json'
    jokeType?: "single" | "twopart" | "any"; // default 'any'
    searchString?: string;
    language?: "cs" | "de" | "en" | "es"; // default 'en'
    flags?: "" | Flag[]; // default ''
    idRange?: {
        from?: number; // default 0
        // If you are using `en` as your language, maximum is 257
        to?: number; // default 291 (which is the maximum)
    };
    amount?: number; // default 1
};
