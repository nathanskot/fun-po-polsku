import { Component, OnInit } from '@angular/core';
import { Word } from '../models/word';
import { DeclensionService } from '../services/declension.service';
import { CaseType, caseTypes } from '../models/case-type.type';
import { TitleCasePipe } from '@angular/common';
import { WordType, wordTypes } from '../models/word-type.type';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CdkObserveContent } from "@angular/cdk/observers";

@Component({
  selector: 'app-declension-game',
  imports: [
    TitleCasePipe,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
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
  selectedWordTypes = new FormControl(['any'], { nonNullable: true });
  selectedCaseTypes = new FormControl(['any'], { nonNullable: true });
  disabledAny = true;

  constructor(private declensionService: DeclensionService) {}
  
  ngOnInit(): void {
    this.wordList = this.declensionService.getFilteredWordList();
  }

  onChooseAny(formControl: FormControl<string[]>) {
    if (formControl.value.includes('any')) {
      formControl.reset();
      this.disabledAny = true;
    }
  }

  onChooseFilter(formControl: FormControl<string[]>) {
    if (formControl.value.length > 1 && formControl.value.includes('any')) {
      formControl.setValue(formControl.value.filter(str => str !== 'any'));
      this.disabledAny = false;
    }
  }

  onLaunchGame() {
    console.log(`Selected word types: ${this.selectedWordTypes.value}`);
    console.log(`Selected cases: ${this.selectedCaseTypes.value}`);
  }
}
