import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuOption } from '../../interfaces/menu-option.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink],
  templateUrl: './gifs-side-menu-options.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuOptions {
  menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      subLabel: 'Most popular gifs',
      route: '/dashboard/trending',
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Search',
      subLabel: 'Search for gifs',
      route: '/dashboard/search',
    }
  ]
}
