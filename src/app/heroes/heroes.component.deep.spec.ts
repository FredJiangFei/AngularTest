import { By } from '@angular/platform-browser';
import { HeroComponent } from './../hero/hero.component';
import { HeroService } from '../hero.service';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';

describe('HerosComponent (deep test)', () => {
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
        HeroComponent
      ],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should render each hero as a HeroComponent', () => {
    // arragne
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    // assert
    const EDs = fixture.debugElement.queryAll(By.directive(HeroComponent));
    expect(EDs.length).toEqual(2);
  });
});
