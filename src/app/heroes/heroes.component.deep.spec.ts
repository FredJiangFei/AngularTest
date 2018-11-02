import { RouterLinkDirectiveStub } from './router-link-directive-stub';
import { By } from '@angular/platform-browser';
import { HeroComponent } from './../hero/hero.component';
import { HeroService } from '../hero.service';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { NO_ERRORS_SCHEMA, Directive, Input } from '@angular/core';
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
        HeroComponent,
        RouterLinkDirectiveStub
      ],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ],
      // schemas: [NO_ERRORS_SCHEMA]
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

  it(`should call heroService delete when hero delete button is clicked`, () => {
    spyOn(fixture.componentInstance, 'delete');

    // arragne
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    // act
    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    heroComponents[0].query(By.css('button'))
      .triggerEventHandler('click', { stopPropagation: () => { } });

    // (<HeroComponent>heroComponents[0].componentInstance).delete.emit()

    // assert
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  it('should add a new hero to the hero list when the add button is clicked', () => {
    // arragne
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const name = 'jack';
    mockHeroService.addHero.and.returnValue(of({ id: 5, name: name, strength: 4 }));

    // act
    const nameInput = fixture.debugElement.query(By.css('input')).nativeElement;
    nameInput.value = name;

    const addButton = fixture.debugElement.query(By.css('button'));
    addButton.triggerEventHandler('click', null);

    // assert
    expect(fixture.componentInstance.heroes[2].name).toEqual(name);
  });

  it('should have correct route for the first hero', () => {
    // arragne
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    // act
    fixture.debugElement.query(By.css('a')).triggerEventHandler('click', null);

    // assert
    const routerLinks = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
    const routerLink = routerLinks[0].injector.get(RouterLinkDirectiveStub);
    expect(routerLink.navigatedTo).toBe(`/detail/${HEROES[0].id}`);
  });
});
