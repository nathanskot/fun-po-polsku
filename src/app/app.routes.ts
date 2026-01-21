import { Routes } from '@angular/router';
import { DeclensionGame } from './declension-game/declension-game';
import { LandingPage } from './landing-page/landing-page';
import { Dictionary } from './dictionary/dictionary';
import { SavedWords } from './saved-words/saved-words';

export const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'declension', component: DeclensionGame },
  { path: 'dictionary', component: Dictionary },
  { path: 'saved-words', component: SavedWords }
];
