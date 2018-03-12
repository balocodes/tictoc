import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ReloadComponent } from './reload/reload.component';
import { GameComponent } from './game/game.component';
import { FeedsService } from './feeds.service';

const routes = [{ path:"game", component:GameComponent},
{path:"reload", component:ReloadComponent}];

@NgModule({
  declarations: [
    AppComponent,
    ReloadComponent,
    GameComponent
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [FeedsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
