import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuyComponent } from './buy.component';

describe('BuyComponent', () => {
  let component: BuyComponent;
  let fixture: ComponentFixture<BuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
