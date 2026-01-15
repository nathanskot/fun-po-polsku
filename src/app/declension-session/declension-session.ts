import { Component, input } from '@angular/core';
import { Word } from '../models/word';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-declension-session',
  imports: [
    MatButtonModule
  ],
  templateUrl: './declension-session.html',
  styleUrl: './declension-session.scss',
})
export class DeclensionSession {

  wordList = input.required<Word[]>();
  filters = input.required<{
    wordTypes: string[],
    caseTypes: string[],
    questionAmount: number
  }>();
}
