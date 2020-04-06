export class TimeSpanFactory {

    constructor() {
        this.endTime = new Date();
    }

    get(timeSpanId) {
        let startTime = new Date();
        
        switch(timeSpanId) {
            case '-1h':
                lastHour.call(startTime);
                break;
            
            case '-1d':
                lastDay.call(startTime);
                break;

            case '-1w':
                lastWeek.call(startTime);
                break;
            
            case '-1m':
                lastMonth.call(startTime);
                break;
            
            case '-1y':
                lastYear.call(startTime);
                break;

            case '-5y':
                lastFiveYears.call(startTime);
                break;
        }

        return {
            startTime,
            endTime: new Date()
        }
    }
}

const lastMonth = function(){
    this.setMonth(this.getMonth() - 1);
}

const lastHour = function() {
    this.setHours(this.getHours() - 1);
}

const lastDay = function() {
    this.setHours(this.getHours()-24);
}

const lastWeek = function() {
    this.setHours(this.getHours()-24*7);
}

const lastYear = function() {
    this.setFullYear(this.getFullYear() - 1);
}

const lastFiveYears = function() {
    this.setFullYear(this.getFullYear() - 5);
}

export default new TimeSpanFactory();

