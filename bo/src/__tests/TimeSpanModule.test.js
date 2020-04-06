import {TimeSpanFactory} from '../modules/TimeSpan.js';

describe('Testing Time Span Instance', () => {
    const endTime = new Date();
    let timeSpanFactory = new TimeSpanFactory(endTime);
    
    it('getting last hour time span', () => {
        const lastHourSpan = timeSpanFactory.get('-1h');
        expect(lastHourSpan.endTime).toBe(endTime);
        expect(lastHourSpan.endTime-lastHourSpan.startTime).toBe(60*60*1000);
    });

    it('getting last day time span', () => {
        const lastHourSpan = timeSpanFactory.get('-1d');
        expect(lastHourSpan.endTime).toBe(endTime);
        expect(lastHourSpan.endTime-lastHourSpan.startTime).toBe(24*60*60*1000);
    });

});