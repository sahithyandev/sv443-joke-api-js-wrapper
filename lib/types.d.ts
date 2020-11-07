export declare type category = "" | "Any" | "Programming" | "Miscellaneous" | "Dark" | "Pun" | "Spooky" | "Christmas";
export declare type requestOptions = {
    categories: category[];
    responseFormat: "json" | "xml" | "yaml" | "plain";
    jokeType: {
        single: Boolean;
        twopart: Boolean;
    };
    searchString: String;
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
