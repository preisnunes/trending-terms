import googleTrendingService from '../services/trending.js';

export const getInterestOverTime = async function(req, res){
    try{
        const searchItems = JSON.parse(req.query.items);
        const timeWindow = req.query.timeWindow;
    
        let keywords = [];
        let geo = [];
    
        searchItems.forEach((item) => {
            keywords.push(item.term);
            geo.push(item.geo);
        });
        
        const termsInterestOverTime =  await googleTrendingService.fetchInterestOverTime(keywords, geo); 
        res.send(termsInterestOverTime);
    }
    catch (Exception)
    {
        res.status(500).send({ error: Exception.message });
    }
};
