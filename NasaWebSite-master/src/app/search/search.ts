import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchService } from './search.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.html',
  styleUrl: './search.scss'
})
export class Search {
  items: Array<{ title: string; description: string; imageUrl?: string }> = [];
  selectedImageUrl?: string;
  previewImageUrl?: string;
  private subscription?: Subscription;

  // NASA Images API does not require an API key; keep reader for future use if needed
  private buildNasaImagesUrl(query: string): string {
    const params = new URLSearchParams({ media_type: 'image', q: query });
    return `https://images-api.nasa.gov/search?${params.toString()}`;
  }

  constructor(private readonly searchService: SearchService) {}

  ngOnInit(): void {
    this.subscription = this.searchService.searchTerm$.subscribe((term) => {
      const query = term?.trim();
      if (!query) return;
      this.searchingApi(query);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  searchingApi(query: string) { // Perform search using NASA API

    interface NasaItem {
      data: Array<{ title: string; description?: string; description_508?: string }>;
      links?: Array<{ href: string; render?: string }>;
    }

    interface NasaResponse { collection: { items: Array<NasaItem> } }

    const apiUrl = this.buildNasaImagesUrl(query);
    fetch(apiUrl)
      .then((response: Response) => response.json())
      .then((data: NasaResponse) => {
        const items = data?.collection?.items || [];
        this.items = items.map((entry: NasaItem) => {
          const meta = entry.data?.[0];
          const imageLink = (entry.links || []).find(l => l.render === 'image') || (entry.links || [])[0];
          const rawDescription = meta?.description || meta?.description_508 || '';
          const cleanedDescription = rawDescription && rawDescription.trim() !== (meta?.title || '').trim()
            ? rawDescription
            : (rawDescription ? '' : '');
          return {
            title: meta?.title || 'Untitled',
            description: cleanedDescription || 'No description available.',
            imageUrl: imageLink?.href
          };
        }).filter(item => !!item.imageUrl);
      })
      .catch((error: unknown) => console.error('Error fetching search results:', error));
  }

  openImage(url?: string): void {
    if (!url) return;
    this.selectedImageUrl = url;
  }

  closeImage(): void {
    this.selectedImageUrl = undefined;
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    this.closeImage();
  }

  onPreview(url?: string): void {
    if (!url) return;
    this.previewImageUrl = url;
  }

  endPreview(): void {
    this.previewImageUrl = undefined;
  }

}
