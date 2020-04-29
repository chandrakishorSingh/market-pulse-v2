import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WatchlistPage } from './watchlist.page';

describe('WatchlistPage', () => {
  let component: WatchlistPage;
  let fixture: ComponentFixture<WatchlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchlistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WatchlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
