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

export const sortOptions: { sortBy: SortMethod, name: string }[] = [
    { sortBy: 'alphabetically', name: 'Alphabetically \'A - Z\'' },
    { sortBy: 'reverse-alphabetically', name: 'Alphabetically \'Z - A\'' },
    { sortBy: 'reverse-price', name: 'Price Low to High' },
    { sortBy: 'price', name: 'Price High to Low' },
    { sortBy: 'reverse-percentage', name: 'Percentage Low to High' },
    { sortBy: 'percentage', name: 'Percentage High to Low' },
];
