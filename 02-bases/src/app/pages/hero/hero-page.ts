import { Component, computed, signal } from "@angular/core";
import { UpperCasePipe } from "@angular/common";

@Component({
  templateUrl: './hero-page.html',
  imports: [UpperCasePipe],
})
export class HeroPage{
  name = signal("Ironman");
  age = signal(45);

  heroDescription = computed(() => {
    const description = `${ this.name() } - ${ this.age() }`;
    return description;
  })

  capitalizeName = computed(() => this.name().toUpperCase())

  changeHero(): void {
    this.name.set('Spiderman');
    this.age.set(22);
  }

  resetForm(): void {
    this.name.set('Ironman');
    this.age.set(45);
  }

  changeAge(): void {
    this.age.set(60);
  }
}
