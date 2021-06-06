import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { BackendErrorsMessagesModule } from './shared/modules/backendErrorsMessages/backendErrorsMessages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { NavbarModule } from './shared/modules/navbar/navbar.module';
import { BlogModule } from './blog/blog.module';
import { AppEffect } from './shared/store/Effects/app.effect';
import { AuthInterceptor } from './shared/services/authInterceptor.service';
import { PersistenceService } from './shared/services/PersistenceService';
import { FeedModule } from './feed/feed.module';
import { MessagesModule } from './messages/messages.module';
import { SettingsModule } from './settings/settings.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    NavbarModule,
    BlogModule,
    FeedModule,
    MessagesModule,
    SettingsModule,
    UserModule,
    BackendErrorsMessagesModule,
    StoreModule.forRoot([]),
    HttpClientModule,
    EffectsModule.forRoot([AppEffect]),
    MatFormFieldModule,
    MatSliderModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    PersistenceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
