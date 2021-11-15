import { Component } from '@angular/core';
import { LocalStorageService } from './common-service/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mock-project';
  // localStorageChanges$ = this.localStorageService.changes$;
  // constructor(private localStorageService: LocalStorageService) {}
  // persist(key: string, value: any) {
  //   this.localStorageService.set(key, value);
  // }
}
