export interface Filters {
    limit?: number,
    offset?: number,
    order?: string,
    findBy?: findBy
}

interface findBy {
    field: string,
    value: any,
}

export const HasValue =  function(value:any):Boolean {
    return typeof value !== 'undefined';
}