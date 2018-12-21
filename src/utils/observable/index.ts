import { IObservable, IObserver } from './types';

export class Observable implements IObservable {
    private observers: IObserver[] = [];
    public addObserver(observer: IObserver) {
        this.observers.push(observer);
    }

    public deleteObserver(observer: IObserver) {
        const index: number = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }

    public notifyObservers() {
        this.observers.forEach(o => o.update(this));
    }
}
