export function isEmptyString (data: string): boolean {

    if (typeof data !== "string") return true;
    if (data === null || data === undefined ) return true;
    if (data.trim().length===0 ) return true;

    return false;
} 