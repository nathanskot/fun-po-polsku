import { CdkObserveContent } from "@angular/cdk/observers";
import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DECLENSION_DEFAULT_QUESTION_AMOUNT, DECLENSION_MAX_QUESTIONS } from '../app.constants';
import { DeclensionSession } from "../declension-session/declension-session";
import { caseTypeLabels } from '../models/case-type.type';
import { Word } from '../models/word';
import { wordTypeLabels } from '../models/word-type.type';
import { DictionaryService } from '../services/dictionary.service';

@Component({
  selector: 'app-declension-game',
  imports: [
    TitleCasePipe,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CdkObserveContent,
    DeclensionSession
],
  templateUrl: './declension-game.html',
  styleUrl: './declension-game.scss',
})
export class DeclensionGame {

  caseTypesStr = Object.keys(caseTypeLabels);
  wordTypesStr = Object.keys(wordTypeLabels);

  wordList: Word[] = [];
  filters!: {
    wordTypes: string[],
    caseTypes: string[],
    questionAmount: number
  };

  filtersForm = new FormGroup({
    wordTypes: new FormControl(['any'], [ Validators.required ]),
    caseTypes: new FormControl(['any'], [ Validators.required ]),
    questionAmount: new FormControl(
      DECLENSION_DEFAULT_QUESTION_AMOUNT,
      [
        Validators.required,
        Validators.pattern('[0-9]*'),
        Validators.max(DECLENSION_MAX_QUESTIONS)
      ]
    )
  });
  
  disabledAny: boolean = true;
  gameLaunched: boolean = false;

  constructor(private dictionaryService: DictionaryService) {}

  onChooseAny(formControl: FormControl<string[] | null>): void {
    if (!formControl.value)
      return;

    if (formControl.value.includes('any')) {
      this.resetFilter(formControl);
    }
  }

  onChooseFilter(formControl: FormControl<string[] | null>): void {
    if (!formControl.value)
      return;

    if (formControl.value.length > 1 && formControl.value.includes('any')) {
      formControl.setValue(formControl.value.filter(str => str !== 'any'));
      this.disabledAny = false;
    }
    else if (formControl.value.length == 0) {
      this.resetFilter(formControl);
    }
  }

  onLaunchGame(): void {
    this.filters = {
      wordTypes:      this.filtersForm.controls.wordTypes.value!,
      caseTypes:      this.filtersForm.controls.caseTypes.value!,
      questionAmount: this.filtersForm.controls.questionAmount.value!
    }

    this.wordList = this.dictionaryService.getFilteredWordList(this.filters.questionAmount);

    this.gameLaunched = true;
    console.log(`Game launched with:`);
    console.log(`Word types: ${this.filters.wordTypes}`);
    console.log(`Case types: ${this.filters.caseTypes}`);
    console.log(`Question amount: ${this.filters.questionAmount}`);
  }

  onExitGame() {
    this.gameLaunched = false;
  }

  private resetFilter(formControl: FormControl<string[] | null>) {
    formControl.setValue(['any']);
    this.disabledAny = true;
  }
}
