import { Routes } from '@angular/router';
import { DeclensionGame } from './declension-game/declension-game';
import { LandingPage } from './landing-page/landing-page';
import { Dictionary } from './dictionary/dictionary';

export const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'declension', component: DeclensionGame },
  { path: 'dictionary', component: Dictionary }
];
