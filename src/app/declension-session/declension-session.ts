import { Component, input, OnInit } from '@angular/core';
import { Word } from '../models/word';
import { WordType } from '../models/word-type.type';
import { CaseType } from '../models/case-type.type';
import { DeclensionQuestion } from '../models/declension-question';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-declension-session',
  imports: [
    MatButtonModule
  ],
  templateUrl: './declension-session.html',
  styleUrl: './declension-session.scss',
})
export class DeclensionSession implements OnInit {

  sessionWordList = input.required<Word[]>();
  filters = input.required<{
    wordTypes: WordType[],
    caseTypes: CaseType[],
    questionAmount: number
  }>();

  questions: DeclensionQuestion[] = [];

  ngOnInit(): void {
    for (const word of this.sessionWordList()) {
      this.questions.push(new DeclensionQuestion(word, this.filters().caseTypes));
    }

    console.log([...this.questions]);
  }
}
