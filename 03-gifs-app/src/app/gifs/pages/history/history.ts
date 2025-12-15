import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Gif } from '../../interfaces/gif.interface';
import { GifsList } from "../../components/gifs-list/gifs-list";
import { GifsService } from '../../services/gifs.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-history',
  imports: [GifsList],
  templateUrl: './history.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class History {

  gifService = inject(GifsService);

  query = toSignal(
    inject(ActivatedRoute).params.pipe(
      map((params) => params['query'])
    )
  )

  gifsByKey = computed(() => this.gifService.getHistoryGifs(this.query()));
}
