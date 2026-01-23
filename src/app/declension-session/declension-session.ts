import { Component, input, OnInit, signal } from '@angular/core';
import { WordType } from '../models/word-type.type';
import { CaseType } from '../models/case-type.type';
import { DeclensionQuestion } from '../models/declension-question';
import { MatButtonModule } from '@angular/material/button';
import { DictionaryService } from '../services/dictionary.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Loader } from '../loader/loader';

@Component({
  selector: 'app-declension-session',
  imports: [
    MatButtonModule,
    MatProgressSpinnerModule,
    AsyncPipe,
    Loader
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
  currentQuestionIndex = signal(0);
  hasAnswerBeenSubmitted = signal(false);
  score = 0;

  constructor(private dictionaryService: DictionaryService) {}

  ngOnInit(): void {
    this.questions$ = this.dictionaryService.getDeclensionQuestions(
      this.filters().questionAmount,
      this.filters().wordTypes,
      this.filters().caseTypes
    );
  }

  onSubmitAnswer(isAnswer: boolean): void {
    if (this.hasAnswerBeenSubmitted())
      return;

    this.hasAnswerBeenSubmitted.set(true);
    if (isAnswer)
      this.score += 1;

    setTimeout(() => {
      this.currentQuestionIndex.update(value => value + 1);
      this.hasAnswerBeenSubmitted.set(false);
    }, 2000);
  }
}
