import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IconRegistryService {
  private readonly spritePath = 'icons/sprite.svg';
  private loaded = false;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private http: HttpClient,
  ) {}

  load(): Observable<void> {
    if (this.loaded) return of(undefined);
    return this.http.get(this.spritePath, { responseType: 'text' }).pipe(
      tap((_svg) => {
        const div = this.doc.createElement('div');
        div.style.display = 'none';
        div.innerHTML = _svg;
        this.doc.body.appendChild(div);
        this.loaded = true;
      }),
      map(() => undefined),
    );
  }

  resolve(name: string): string {
    return `#icon-${name}`;
  }
}
