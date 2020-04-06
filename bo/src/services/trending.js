import googleTrends from 'google-trends-api';
import TimeSpanFactory from '../modules/TimeSpan.js';

export class GoogleTrending {

    constructor(service) {
        this.service = service;
    }

    /**
     * This method receives an array of keywords and the correspondent country codes
     * to fetch the service API for.
     * @param {array} keywords 
     * @param {array} geo 
     */
    async fetchInterestOverTime(keywords, geo, timespanCode) {
        const timespan = TimeSpanFactory.get(timespanCode);
        const interestOverTime = JSON.parse(await this.service.interestOverTime(
            {keyword: keywords, ...timespan, geo, granularTimeResolution:true }
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