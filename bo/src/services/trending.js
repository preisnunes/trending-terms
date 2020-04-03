import googleTrends from 'google-trends-api';

export class GoogleTrending {

    constructor(service) {
        this.service = service;
    }

    /**
     * This method receives an array of keywords and the correspondent country codes
     * to search for.
     * @param {array} keywords 
     * @param {array} geo 
     */
    async fetchInterestOverTime(keywords, geo) {
        const startTime = new Date();
        startTime.setMonth(startTime.getMonth() - 1);
        const endTime = new Date();

        const interestOverTime = JSON.parse(await this.service.interestOverTime(
            {keyword: keywords, startTime, endTime, geo }
        ));
        
        const trendingData = interestOverTime['default']['timelineData'];
        
        return trendingData.map(function(item) {
            const time = parseInt(item.time)*1000;
            const value = item.value;
            return {time, value};
        });
    }

}

export default new GoogleTrending(googleTrends);