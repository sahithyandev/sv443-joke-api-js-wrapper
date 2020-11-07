import { requestOptions } from "./types";
declare function getJokes(options: requestOptions): Promise<Response> | null;
export { getJokes };
