
export const getSupportedTimespans = function(req, res){
    res.send([
        {
            code : '-1h',
            name: 'Last hour'
        }, 
        {
            code: '-1d',
            name: 'Last day'
        }, 
        {
            code: '-1w',
            name: 'Last week'
        }, 
        {
            code:'-1m',
            name: 'Last month'
        }, 
        {
            code: '-1y',
            name: 'Last year'
        }, 
        {
            code: '-5y',
            name: 'Last 5 years'
        }
    ]);
};