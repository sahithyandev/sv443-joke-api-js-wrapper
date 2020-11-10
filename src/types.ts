export type Category =
    | "Programming"
    | "Miscellaneous"
    | "Dark"
    | "Pun"
    | "Spooky"
    | "Christmas";

export type Flag = "nsfw" | "religious" | "political" | "sexist";

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
    categories?: Category[] | "Any"; // default 'Any
    responseFormat?: "json" | "xml" | "yaml" | "txt"; // default 'json'
    jokeType?: "single" | "twopart" | "any"; // default 'any'
    searchString?: string;
    language?: "cs" | "de" | "en" | "es"; // default 'en'
    flags?: "" | Flag[]; // default all false
    idRange?: {
        from?: number; // default 0
        to?: number; // default 291 (which is the maximum)
    };
    amount?: number; // default 1
};

export declare function getJokes(options?: requestOptions): Promise<Response>;
