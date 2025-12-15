import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mappers/gif.mapper';
import { map, Observable, tap } from 'rxjs';

const loadFromLocalStorage = (): Record<string, Gif[]> => {
  const gifs = localStorage.getItem('gifSearchHistory');
  return gifs ? JSON.parse(gifs) : {};
}

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private http = inject(HttpClient)

  trendingGifs = signal<Gif[]>([])
  trendingGifsLoading = signal(false);
  private trendingPage = signal(0);

  trendingGifGroup = computed<Gif[][]>(() => {
    const groups = [];

    for (let index = 0; index < this.trendingGifs().length; index+=3) {
      // Por cada 3 elementos, crear un nuevo grupo
      groups.push(this.trendingGifs().slice(index, index + 3));
    }
    console.log({groups});
    return groups;
  })

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {
    if (this.trendingGifsLoading()) return;

    this.trendingPage.update(page => page + 1);
    this.trendingGifsLoading.set(true);

    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: '25',
        offset: this.trendingPage() * 20,
      }
    }).subscribe((response) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);
      this.trendingGifs.update(currentGifs => [
        ...currentGifs,
        ...gifs,

      ]);
      this.trendingGifsLoading.set(false);
      console.log({gifs});
    })
  }

  saveGifsToLocalStorage = effect(() => {
    localStorage.setItem('gifSearchHistory', JSON.stringify(this.searchHistory()));
  })

  searchGifs(query: string): Observable<Gif[]> {
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        q: query,
        limit: '25'
      }
    }).pipe(
      map(({ data }) => data),
      map((items) => GifMapper.mapGiphyItemsToGifArray(items)),

      tap(items => {
        this.searchHistory.update(history => ({
          ...history,
          [query.toLowerCase()]: items
        }))
      })
    )
  }

  getHistoryGifs(query: string): Gif[]{
    return this.searchHistory()[query] ?? [];
  }
}
