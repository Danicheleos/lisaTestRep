import { Component, OnInit } from '@angular/core';
import { Pipe } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component ({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})

export class HeroesComponent implements OnInit{
  public heroes!: Hero[];

  constructor(private heroService: HeroService) { }

  public ngOnInit(): void {
    this.getHeroes();
  }

  public getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  public add(name: string): void {
    name = name.trim();
    if(!name) { return; }
    this.heroService.addHero({ name } as Hero).subscribe(
      hero => {
        this.heroes.push(hero);
      }
    );
  }

  public delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
