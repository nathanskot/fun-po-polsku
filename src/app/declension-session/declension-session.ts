import { Component, input, OnInit } from '@angular/core';
import { WordType } from '../models/word-type.type';
import { CaseType } from '../models/case-type.type';
import { DeclensionQuestion } from '../models/declension-question';
import { MatButtonModule } from '@angular/material/button';
import { DictionaryService } from '../services/dictionary.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-declension-session',
  imports: [
    MatButtonModule,
    AsyncPipe
],
  templateUrl: './declension-session.html',
  styleUrl: './declension-session.scss',
})
export class DeclensionSession implements OnInit {

  filters = input.required<{
    wordTypes: WordType[],
    caseTypes: CaseType[],
    questionAmount: number
  }>();

  questions$!: Observable<DeclensionQuestion[]>;

  constructor(private dictionaryService: DictionaryService) {}

  ngOnInit(): void {
    // this.dictionaryService.getRandomWords(
    //   this.filters().questionAmount,
    //   this.filters().wordTypes
    // ).subscribe(words => {
    //   this.sessionWords = words;
    //   for (const word of this.sessionWords) {
    //     this.questions.push(new DeclensionQuestion(word, this.filters().caseTypes));
    //   }
    //   this.isLoading = false;
    //   console.log(...this.questions);
    // });
    this.questions$ = this.dictionaryService.getDeclensionQuestions(
      this.filters().questionAmount,
      this.filters().wordTypes,
      this.filters().caseTypes
    );
  }
}
