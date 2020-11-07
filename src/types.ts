export type category =
    | undefined
    | "Programming"
    | "Miscellaneous"
    | "Dark"
    | "Pun"
    | "Spooky"
    | "Christmas";

export type requestOptions = {
    categories?: category[] | "Any";
    responseFormat?: "json" | "xml" | "yaml" | "plain";
    jokeType: "single" | "twopart" | "any";
    searchString?: String;
    language: "cs" | "de" | "en" | "es";
    flags: {
        nsfw: Boolean;
        religious: Boolean;
        political: Boolean;
        sexist: Boolean;
    };
    idRange: {
        from: number;
        to: number;
    };
    amount: number;
};
