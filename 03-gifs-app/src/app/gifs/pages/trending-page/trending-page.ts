import { ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrendingPage {
  gifService = inject(GifsService);

  // Referencia al elemento HTML del componente
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupContainer');

  onScroll(event: Event){

    // Obtenemos la referencia al elemento HTML usando la referencia creada con viewChild
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollDiv;

    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;
    console.log({isAtBottom});

    if (isAtBottom) {
      this.gifService.loadTrendingGifs();
    }
  }
}
