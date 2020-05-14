import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FundsPage } from './funds.page';

describe('FundsPage', () => {
  let component: FundsPage;
  let fixture: ComponentFixture<FundsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FundsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
