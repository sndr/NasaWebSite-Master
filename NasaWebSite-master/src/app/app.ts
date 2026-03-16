import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";

@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet],
  template:`
    <app-header></app-header>
    <main>
     <router-outlet />
    </main>
  `,
  styleUrls: ['./app.scss']
})
export class App {
}
