import { TwitchService } from './../../services/twitch.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-channel-card',
  templateUrl: './channel-card.component.html',
  styleUrls: ['./channel-card.component.css']
})
export class ChannelCardComponent implements OnInit {
  @Input() streamName: string;
  @Input() isLive = false;
  @Input() isLoading = true;
  @Input() viewers = 0;

  constructor() {
  }

  ngOnInit(): void {
  }
}
