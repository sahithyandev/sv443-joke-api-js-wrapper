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
    idRange?: {
        from?: number;
        to?: number;
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
        from?: number;
        to?: number;
    };
    amount?: number; // default 1
};

export type Error = {
    errorMessage: string;
};
