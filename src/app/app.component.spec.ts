import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatSnackBarModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
      ],
      declarations: [
        AppComponent
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
