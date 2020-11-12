export type Category =
    | "Programming"
    | "Miscellaneous"
    | "Dark"
    | "Pun"
    | "Spooky"
    | "Christmas";

export type Flag = "nsfw" | "religious" | "political" | "racist" | "sexist";

export type ResponseFormat = "json" | "xml" | "yaml" | "plain"

export type JokeType = "single" | "twopart";

export type Error = {
    message: string;
    description: string
};

export enum ErrorMessages {
    INVALID_AMOUNT = "`amount` value is invalid",
    INVALID_ID_RANGE =  "`idRange` object is invalid"
}

// for validation
export type strictRequestOptions = {
    categories: Category[] | "Any";
    responseFormat: ResponseFormat;
    jokeType: "any" | JokeType;
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
    responseFormat?: ResponseFormat; // default 'json'
    jokeType?: "any" | JokeType; // default 'any'
    searchString?: string;
    language?: "cs" | "de" | "en" | "es"; // default 'en'
    flags?: "" | Flag[]; // default ''
    idRange?: {
        from?: number;
        to?: number;
    };
    amount?: number; // default 1
}

export type JokeAPIParams = {
    amount?: number,
    lang?: string,
    format?: ResponseFormat,
    idRange?: string
    contains?: string,
    type?: JokeType,
    blackListFlags?: string
};