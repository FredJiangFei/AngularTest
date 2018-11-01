import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs/internal/observable/of';
describe('HerosComponent', () => {
  let component: HeroesComponent;
  let HEROES;
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: 'Fred', strength: 8 },
      { id: 2, name: 'Dan', strength: 24 }
    ];

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    component = new HeroesComponent(mockHeroService);
  });

  describe('delete', () => {
    it('should remove hero from hero list', () => {
      // arrange
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      // act
      component.delete(HEROES[1]);

      // assert
      expect(component.heroes.length).toBe(1);
    });
  });
});
