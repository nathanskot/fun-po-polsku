import { CdkObserveContent } from "@angular/cdk/observers";
import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DECLENSION_DEFAULT_QUESTION_AMOUNT, DECLENSION_MAX_QUESTIONS } from '../app.constants';
import { DeclensionSession } from "../declension-session/declension-session";
import { CaseType, caseTypeLabels } from '../models/case-type.type';
import { Word } from '../models/word';
import { WordType, wordTypeLabels } from '../models/word-type.type';
import { DictionaryService } from '../services/dictionary.service';
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-declension-game',
  imports: [
    TitleCasePipe,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
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

  sessionWordList: Word[] = [];
  filters!: {
    wordTypes: WordType[],
    caseTypes: CaseType[],
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
    let selectedWordTypeArray: WordType[] = [];
    if (this.filtersForm.controls.wordTypes.value!.includes('any'))
      selectedWordTypeArray = Object.values(wordTypeLabels);
    else {
      for (let wordType of this.filtersForm.controls.wordTypes.value!)
        selectedWordTypeArray.push(wordTypeLabels[wordType]);
    }

    let selectedCaseTypeArray: CaseType[] = [];
    if (this.filtersForm.controls.caseTypes.value!.includes('any'))
      selectedCaseTypeArray = Object.values(caseTypeLabels);
    else {
      for (let caseType of this.filtersForm.controls.caseTypes.value!)
        selectedCaseTypeArray.push(caseTypeLabels[caseType]);
    }
    
    this.filters = {
      wordTypes:      selectedWordTypeArray,
      caseTypes:      selectedCaseTypeArray,
      questionAmount: this.filtersForm.controls.questionAmount.value!
    }

    this.sessionWordList = this.dictionaryService.getRandomizedFilteredWordList(
      undefined,
      this.filters.questionAmount,
      selectedWordTypeArray
    );

    this.gameLaunched = true;
    console.log('Game launched with:');
    console.log(`Word types: ${this.filters.wordTypes}`);
    console.log(`Case types: ${this.filters.caseTypes}`);
    console.log(`Question amount: ${this.filters.questionAmount}`);
    console.log('Session word list:');
    for (let word of this.sessionWordList)
      console.log(word.str);
  }

  onExitGame() {
    this.gameLaunched = false;
  }

  private resetFilter(formControl: FormControl<string[] | null>) {
    formControl.setValue(['any']);
    this.disabledAny = true;
  }
}
