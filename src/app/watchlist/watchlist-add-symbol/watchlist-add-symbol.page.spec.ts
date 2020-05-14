import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WatchlistAddSymbolPage } from './watchlist-add-symbol.page';

describe('WatchlistAddSymbolPage', () => {
  let component: WatchlistAddSymbolPage;
  let fixture: ComponentFixture<WatchlistAddSymbolPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchlistAddSymbolPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WatchlistAddSymbolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
