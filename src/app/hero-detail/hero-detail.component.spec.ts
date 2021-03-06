import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from './../hero.service';
import { TestBed, ComponentFixture, fakeAsync, tick, flush, async } from '@angular/core/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { Location } from '@angular/common';
import { of } from 'rxjs/internal/observable/of';

describe('HeroDetailComponent', () => {
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockHeroService, mockLocation, mockActivatedRoute;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocation = jasmine.createSpyObj(['back']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => '3'
        }
      }
    };

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Location, useValue: mockLocation }
      ]
    });

    fixture = TestBed.createComponent(HeroDetailComponent);

    mockHeroService.getHero.and.returnValue(of({ id: 3, name: 'fred', strength: 4 }));
  });

  it('should render hero name in a h2 tag', () => {
    // act
    fixture.detectChanges();

    // assert
    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('FRED');
  });

  it('should call updateHero when save is called fakeAsync', fakeAsync(() => {
    // arrange
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    // act
    fixture.componentInstance.save();
    // tick(250);
    flush();

    // assert
    expect(mockHeroService.updateHero).toHaveBeenCalled();
  }));

  it('should call updateHero when save is called async', async(() => {
    // arrange
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    // act
    fixture.componentInstance.save();

    // assert
    fixture.whenStable().then(() => {
      expect(mockHeroService.updateHero).toHaveBeenCalled();
    });
  }));
});
