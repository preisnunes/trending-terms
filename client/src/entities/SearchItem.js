
export class SearchItem {
    
    constructor(term, geo) {
        this.term = term;
        this.geo = geo;
    }

    equals(item) {
        return (this.term === item.term && this.geo === item.geo) ? true: false;
    }

    getId() {
        return `${this.term}-${this.geo}`;
    }

    isValid() {
        return this.term.length === 0 ? false : true;
    }
}

export default SearchItem;