import { Component, input } from '@angular/core';
import { Word } from '../models/word';

@Component({
  selector: 'app-declension-session',
  imports: [],
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
