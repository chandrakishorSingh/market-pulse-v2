import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WatchItemComponent } from './watch-item.component';

describe('WatchItemComponent', () => {
  let component: WatchItemComponent;
  let fixture: ComponentFixture<WatchItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchItemComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WatchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
