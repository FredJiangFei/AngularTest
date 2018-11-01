import { By } from '@angular/platform-browser';
import { HeroService } from './../hero.service';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { FakeHeroComponent } from '../hero/fake-hero.component';

describe('HerosComponent (shallow test)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: 'Fred', strength: 8 },
      { id: 2, name: 'Dan', strength: 24 }
    ];
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        FakeHeroComponent
      ],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should set heros correctly from service', () => {
    // arrange
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    // assert
    expect(fixture.componentInstance.heroes.length).toBe(2);
  });

  it('should create one li for each hero', () => {
    // arrange
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    // assert
    expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(2);
  });
});
