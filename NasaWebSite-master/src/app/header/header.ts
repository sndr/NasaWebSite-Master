import { Component } from '@angular/core';
import { Githubphoto } from './githubphoto';
import { SearchService } from '../search/search.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Githubphoto],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  constructor(private readonly searchService: SearchService) {}

  onSearch(term: string): void {
    const query = term?.trim();
    if (!query) return;
    this.searchService.publish(query);
  }
}
