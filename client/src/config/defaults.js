export const searchItems = {
    limit: 10
}

export const timeWindows = [
    {
        id : '-1h',
        name: 'Last hour'
    }, 
    {
        id: '-1d',
        name: 'Last day'
    }, 
    {
        id: '-1w',
        name: 'Last week'
    }, 
    {
        id:'-1m',
        name: 'Last month'
    }, 
    {
        id: '-1y',
        name: 'Last year'
    }, 
    {
        id: '-5y',
        name: 'Last 5 years'
    }
];

export const trendsAPI = 'api/v1/trends';