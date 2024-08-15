import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';

// Para usar Jquery en TypeScript
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  videos = [];
  videoSeleccionado: any;

  constructor(public _youtubeService: YoutubeService) {
    this._youtubeService.getVideos().subscribe(resp => {
      this.videos = resp;
    });
  }

  ngOnInit() {
  }

  verVideo(video: any) {
    this.videoSeleccionado = video;
    $('#modalYoutube').modal();
  }

  cerrarModal() {
    this.videoSeleccionado = null;
    $('#modalYoutube').modal('hide');
  }

  verMas() {
    this._youtubeService.getVideos().subscribe(resp => {
      this.videos.push.apply(this.videos, resp);
    });
  }

}
