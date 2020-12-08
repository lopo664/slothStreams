import { StaticAuthProvider } from 'twitch-auth';
import { TwitchService } from './../services/twitch.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiClient } from 'twitch/lib';


class Stream {
  name: string;
  isLive: boolean;
  viewers: number;
  loading: boolean;

  constructor(name: string, isLive = false, viewers = 0, loading = true) {
    this.name = name;
    this.isLive = isLive;
    this.viewers = viewers;
    this.loading = loading;
  }
}

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css']
})

export class StreamsComponent implements OnInit {
  @ViewChild('twitchEmbedId') private twitchEmbedId: ElementRef;

  clientId: string;
  accessToken: string;
  authProvider: StaticAuthProvider;
  apiClient: ApiClient;

  title = 'Streams';

  public listStreams: Stream[] = [];

  constructor() {
    this.clientId = '4ug51oe79cgnviv7jez7ntfzq50erb';
    this.accessToken = 'c4j3aqn5vmpnyvotxwrwx3k4rtij4t';
    this.authProvider = new StaticAuthProvider(this.clientId, this.accessToken);
    this.apiClient = new ApiClient({ authProvider: this.authProvider });

    this.listStreams.push(new Stream('Atrocity'));
    this.listStreams.push(new Stream('limit_maximum'));
    this.listStreams.push(new Stream('Gapezilla'));
    this.listStreams.push(new Stream('Maeveycakes'));
    this.listStreams.push(new Stream('Fragnance'));
    this.listStreams.push(new Stream('Rogerbrown'));
    this.listStreams.push(new Stream('GingiTV'));
    this.listStreams.push(new Stream('Scripe'));
    this.listStreams.push(new Stream('Naowh'));
    this.listStreams.push(new Stream('Zaelia'));
    this.listStreams.push(new Stream('Imfiredup'));
    this.listStreams.push(new Stream('Preheat'));
    this.listStreams.push(new Stream('JoshPriest'));
  }

  ngOnInit(): void {
    this.loadInfo();
  }

  loadStream(streamName: string) {
    this.twitchEmbedId.nativeElement.innerHTML = '';
    const embed = new TwitchEmbed.Embed('twitch-embed', {
      width: '100%',
      height: '800px',
      channel: streamName,
      layout: 'video',
      autoplay: true
    });

    embed.

    embed.addEventListener(TwitchEmbed.Embed.VIDEO_READY, () => {
      embed.getPlayer().play();
    });
  }

  async loadInfo() {
    for (const streamer of this.listStreams) {
      const user = await this.apiClient.helix.users.getUserByName(streamer.name);

      if (user) {
        const stream = await this.apiClient.helix.streams.getStreamByUserId(user.id);

        if (stream) {
          streamer.viewers = stream?.viewers || 0;
          streamer.isLive = true;
        }
      }
      streamer.loading = false;
    }
  }

}
