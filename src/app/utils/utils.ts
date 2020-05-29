import {Observable} from 'rxjs';

export type SortMethod = 'alphabetically' | 'reverse-alphabetically' | 'price' | 'reverse-price' | 'percentage' | 'reverse-percentage';
export type SignalType = 'buy' | 'sell';
export interface PortfolioSummary {
    currentValue: number;
    totalInvestment: number;
    dayPl: number;
    pl: number;
    plPercentage: number;
}

export const extractSymbols = () => {
    return (source: Observable<{ symbols: string[] }>) => {
        return new Observable<string[]>(observer => {
            return source.subscribe({
                next(symbolsData) {
                    observer.next(symbolsData.symbols.sort( (a, b) => a.localeCompare(b)));
                },
                complete() {
                    observer.complete();
                },
                error(err) {
                    observer.error(err);
                }
            });
        });
    };
};

export const toTitleCase = (str: string) => {
    return str[0].toLocaleUpperCase() + str.slice(1);
};

export const toPrecision = (n: number, precision = 2) => Number(Number(n).toPrecision(precision));

export const wait = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

export function firstLetterLower(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
}

export function mapServerResponse(res: object) {
    return Object.entries(res).reduce((a: any[], b: any[]) => {
        const key = firstLetterLower(b[0]);
        const value = b[1];
        return {...a, [key]: value};
    }, {});
}


// gives a string repr. of given number with padding of zeros from left
function padNumber(num: number, len: number) {
    if (num.toString().length < len) {
        let result = '';
        for (let i = 0; i < len - num.toString().length; i++) {
            result += '0';
        }
        return result + num.toString();
    }
    return num.toString();
}

// formats the date obj in YYYY-MM-DD format
export function formatDate(date: Date)  {
    return [date.getFullYear().toString(), padNumber(date.getMonth() + 1, 2), padNumber(date.getDate(), 2)].join('-');
}

export const sortOptions: { sortBy: SortMethod, name: string }[] = [
    { sortBy: 'alphabetically', name: 'Alphabetically \'A - Z\'' },
    { sortBy: 'reverse-alphabetically', name: 'Alphabetically \'Z - A\'' },
    { sortBy: 'reverse-price', name: 'Price Low to High' },
    { sortBy: 'price', name: 'Price High to Low' },
    { sortBy: 'reverse-percentage', name: 'Percentage Low to High' },
    { sortBy: 'percentage', name: 'Percentage High to Low' },
];

