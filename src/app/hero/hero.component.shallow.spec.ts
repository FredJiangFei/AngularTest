import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HeroComponent (shallow tests)', () => {
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroComponent);
  });

  it('should have the correct hero', () => {
    // arrange
    fixture.componentInstance.hero = { id: 1, name: 'Fred', strength: 8 };

    // assert
    expect(fixture.componentInstance.hero.name).toEqual('Fred');
  });

  it('should render the hero name in an anchor tag', () => {
    // arrange
    fixture.componentInstance.hero = { id: 1, name: 'Fred', strength: 8 };
    fixture.detectChanges();

    // assert
    const debugNode = fixture.debugElement.query(By.css('a'));
    expect(debugNode.nativeElement.textContent).toContain('Fred');

    expect(fixture.nativeElement.querySelector('a').textContent).toContain('Fred');
  });
});
