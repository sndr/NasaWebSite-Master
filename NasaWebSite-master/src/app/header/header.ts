import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Githubphoto } from './githubphoto';
import { SearchService } from '../search/search.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Githubphoto, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  constructor(
    private readonly searchService: SearchService,
    private readonly router: Router,
  ) {}

  onSearch(term: string): void {
    const query = term?.trim();
    if (!query) return;
    this.searchService.publish(query);
  }

  goHome(): void {
    // Also reset the current search state to show the "Type some..." empty screen.
    this.searchService.publish('');
    void this.router.navigateByUrl('/');
  }
}
