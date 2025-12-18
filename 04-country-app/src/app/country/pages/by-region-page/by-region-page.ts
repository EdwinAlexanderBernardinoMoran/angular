import { ChangeDetectionStrategy, Component } from '@angular/core';
import { List } from "../../components/list/list";

@Component({
  selector: 'country-by-region-page',
  imports: [List],
  templateUrl: './by-region-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ByRegionPage { }
