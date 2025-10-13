import { Component } from '@angular/core';
import { Header } from "./header/header";
import { Search } from "./search/search";

@Component({
  selector: 'app-root',
  imports: [Header, Search],
  template:`
    <app-header></app-header>
    <main>
     <app-search></app-search>
    </main>
  `,
  styleUrls: ['./app.scss']
})
export class App {
}
