import { TestBed } from "@angular/core/testing"
import { LoginComponent } from "./login.component"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { HttpClientModule } from "@angular/common/http"
import { PipesModule } from "src/app/shared/pipes/pipes.module"
import { ReactiveFormsModule } from "@angular/forms"
import { RouterTestingModule } from "@angular/router/testing"
import { AuthService } from "src/app/core/services/auth.service"
import { AuthServiceMock } from "../../mock/auth-service.mock"

describe('Testing of LoginComponent', ()=>{
    let component: LoginComponent;

    beforeEach(async () =>{
        await TestBed.configureTestingModule({
            declarations: [
              LoginComponent
            ],
            imports: [
              BrowserAnimationsModule,
              HttpClientModule,
              PipesModule,
              ReactiveFormsModule,
              RouterTestingModule,
            ],
            providers: [
                {
                  provide: AuthService,
                  useClass: AuthServiceMock,
                }
              ]
        }).compileComponents()

        const fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('If the email input is empty the emailControl must be invalid', () => {
        component.loginForm.setValue({ email: null, password: null })
        expect(component.emailControl.invalid).toBeTrue();
    });

    it('If the password input is empty the passwordControl must be invalid', () => {
        component.loginForm.setValue({ email: null, password: null })
        expect(component.passwordControl.invalid).toBeTrue();
    });

    it('If the LoginForm is ivalid, must mark the controls as touched', () => {
        component.loginForm.setValue({ email: null, password: null })
        const spyOnMarkAllAsTouched = spyOn(component.loginForm, 'markAllAsTouched');
        
        component.onLogin();

        expect(spyOnMarkAllAsTouched).toHaveBeenCalled();
      });
    
      it('Si el loginForm es valido, debe llamar al metodo login del AuthService', () => {
        component.loginForm.setValue({ email: 'sebastian@email.com', password: '12345' });
        const spyOnAuthServiceLogin = spyOn(TestBed.inject(AuthService), 'login');
        component.onLogin();
        expect(component.loginForm.valid).toBeTrue();
        expect(spyOnAuthServiceLogin).toHaveBeenCalled();
      });
})