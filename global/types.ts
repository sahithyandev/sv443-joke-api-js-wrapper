// Types needed by both the package and the tests

/**
 * A wrapper for "Object with string keys" type
 */
export type StrObject<ValueType> = {
	[key: string]: ValueType;
};

/**
 * A wrapper for "Object with number keys" type
 */
export type NumberObject<ValueType> = {
	[key: number]: ValueType;
};
