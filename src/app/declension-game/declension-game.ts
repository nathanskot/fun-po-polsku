import { Component, OnInit } from '@angular/core';
import { Word } from '../models/word';
import { DeclensionService } from '../services/declension.service';
import { caseTypes } from '../models/case-type.type';
import { wordTypes } from '../models/word-type.type';
import { TitleCasePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CdkObserveContent } from "@angular/cdk/observers";
import { DECLENSION_DEFAULT_QUESTION_AMOUNT, DECLENSION_MAX_QUESTIONS } from '../app.constants';

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
    CdkObserveContent
],
  templateUrl: './declension-game.html',
  styleUrl: './declension-game.scss',
})
export class DeclensionGame implements OnInit {

  caseTypesStr = Object.keys(caseTypes);
  wordTypesStr = Object.keys(wordTypes);

  wordList!: Word[];

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

  constructor(private declensionService: DeclensionService) {}
  
  ngOnInit(): void {
    this.wordList = this.declensionService.getFilteredWordList();
  }

  onChooseAny(formControl: FormControl<string[] | null>) {
    if (!formControl.value)
      return;

    if (formControl.value.includes('any')) {
      this.resetFilter(formControl);
    }
  }

  onChooseFilter(formControl: FormControl<string[] | null>) {
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

  onLaunchGame() {
    console.log(`Selected word types: ${this.filtersForm.controls.wordTypes.value}`);
    console.log(`Selected cases: ${this.filtersForm.controls.caseTypes.value}`);
    console.log(`Selected amount of questions: ${this.filtersForm.controls.questionAmount.value}`);
    this.gameLaunched = true;
  }

  onExitGame() {
    this.gameLaunched = false;
  }

  private resetFilter(formControl: FormControl<string[] | null>) {
    formControl.setValue(['any']);
    this.disabledAny = true;
  }
}
