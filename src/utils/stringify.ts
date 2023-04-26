import queryString from 'query-string';

export const stringify = (query: Record<string, unknown>) => {
    const str = queryString.stringify(query);
    return str ? `?${str}` : ''
}