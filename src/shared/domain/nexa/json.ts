export interface JSONB{
    [key: string]: any;
}

export const safeJSONParse = <T, U>(input: string, mapperFn: (input: T) => U): U[] | U | null => {
    try {
      const parsed: T | T[] = JSON.parse(input);
      if (Array.isArray(parsed)) {
        return parsed.map(mapperFn);
      } else {
        return mapperFn(parsed);
      }
    } catch {
      return null;
    }
  };