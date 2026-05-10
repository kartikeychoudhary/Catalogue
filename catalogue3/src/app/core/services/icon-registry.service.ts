import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IconRegistryService {
  constructor(private readonly http: HttpClient) {}

  load(): Observable<string> {
    return this.http.get('icons/sprite.svg', { responseType: 'text' });
  }
}
