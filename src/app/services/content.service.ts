import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ContentService {
    constructor(private httpClient: HttpClient) { }

    getContent(url: string) {
        return this.httpClient.get(url, { responseType: 'text' });
    }

}