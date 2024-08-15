import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  apiKey = 'AIzaSyASkXSpqIXrA9Mdc_ut1I-vVIx0uIJhEzk';
  playlist = 'UUuaPTYj15JSkETGnEseaFFg';
  nexPageToken = '';
  videos: any[] = [];

  constructor(public _httpClient: HttpClient) { }

  getVideos() {
    const params = new HttpParams()
        .set('part', 'snippet')
        .set('maxResults', '10')
        .set('playlistId', this.playlist)
        .set('key', this.apiKey);

    if (this.nexPageToken) {
      params.set('pageToken', this.nexPageToken);
    }

    return this._httpClient.get(`${this.youtubeUrl}/playlistItems`, { params })
            .pipe(map(resp => {
              console.log(resp);
              this.nexPageToken = resp['nextPageToken'];

              for (let video of resp['items']) {
                let snippet = video['snippet'];
                this.videos.push(snippet);
              }

              return this.videos;
            }));
  }
}
