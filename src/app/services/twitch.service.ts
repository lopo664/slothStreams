import { Injectable } from '@angular/core';
import { ApiClient } from 'twitch';
import { StaticAuthProvider } from 'twitch-auth';

@Injectable({
  providedIn: 'root'
})
export class TwitchService {
  clientId: string;
  accessToken: string;
  authProvider: StaticAuthProvider;
  apiClient: ApiClient;

  constructor() {
    this.clientId = '4ug51oe79cgnviv7jez7ntfzq50erb';
    this.accessToken = 'c4j3aqn5vmpnyvotxwrwx3k4rtij4t';
    this.authProvider = new StaticAuthProvider(this.clientId, this.accessToken);
    this.apiClient = new ApiClient({ authProvider: this.authProvider });
  }

  isStreamLive(userName: string) {
    return this.apiClient.helix.users.getUserByName(userName).then(user => {
      console.log(userName);
      return this.apiClient.helix.streams.getStreamByUserId(user.id) !== null;
    });
  }

  getStreamByUserName(userName: string) {
    return this.apiClient.helix.streams.getStreamByUserName(userName);
  }
}
