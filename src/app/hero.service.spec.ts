import { TestBed, inject } from '@angular/core/testing';
import { MessageService } from './message.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroService } from './hero.service';

describe('HeroServoce', () => {
  let mockMessageService;
  let controller: HttpTestingController;
  let heroService: HeroService;

  beforeEach(function () {
    mockMessageService = jasmine.createSpyObj(['add']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageService }
      ]
    });

    controller = TestBed.get(HttpTestingController);
    heroService = TestBed.get(HeroService);
  });

  describe('getHero', () => {
    it('should call get with correct URL', () => {
      // act
      heroService.getHero(4).subscribe();

      // assert
      controller.expectOne('api/heroes/4');
      // req.flush({ id: 3, name: 'Fred', strength: 100 });
      controller.verify();
    });
  });
});
