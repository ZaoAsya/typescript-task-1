import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { IArticle } from '../state/news/types';
import { WeatherState } from '../state/weather';
import { IMeasurement } from '../state/weather/types';

export class CommonView implements IObserver, IView {
    protected weatherNeedCount: number = 0;
    protected newsNeedCount: number = 0;
    protected className: string = '';
    private articles: IArticle[] = [];
    private measurements: IMeasurement[] = [];
    public render(): void {
        let resultRender: string = `<div class="${this.className}">\n`;
        resultRender += this.articles.map(a => this.getArticleRender(a));
        resultRender += this.measurements.map(w => this.getMeasurementRender(w));
        resultRender += '</div>';
        console.log(resultRender);
    }

    public update(observable: IObservable): void {
        if (observable instanceof NewsState) {
            this.articles = observable.getArticles().slice(-this.newsNeedCount);
            this.render();
        } else if (observable instanceof WeatherState) {
            this.measurements = observable.getMeasurements().slice(-this.weatherNeedCount);
            this.render();
        } else {
            throw new TypeError('Observable should be Weather or News');
        }
    }

    private getArticleRender(article: IArticle): string {
        return `[${article.time}] ${article.category} - ${article.title}\n`;
    }

    private getMeasurementRender(m: IMeasurement): string {
        return `[${m.time}] ${m.temperature} C, ${m.pressure} P, ${m.humidity} U\n`;
    }
}