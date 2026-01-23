import { Component, OnInit, signal } from '@angular/core';
import { Word } from '../models/word';
import { DictionaryService } from '../services/dictionary.service';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { DeclensionTable } from '../declension-table/declension-table';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { WordType, wordTypeLabels } from '../models/word-type.type';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-dictionary',
  imports: [
    AsyncPipe,
    TitleCasePipe,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    DeclensionTable,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatDividerModule,
],
  templateUrl: './dictionary.html',
  styleUrl: './dictionary.scss',
})
export class Dictionary implements OnInit {

  filtersForm = new FormGroup({
    wordTypes: new FormControl<WordType[]>(['noun', 'adjective'], { nonNullable: true }),
    savedWords: new FormControl<boolean>(false, { nonNullable: true })
  });

  words$!: Observable<Word[]>;
  areDeclensionsShown = false;

  wordTypes: WordType[] = Object.values(wordTypeLabels);

  constructor(private dictionaryService: DictionaryService,
              private router: Router) {}

  ngOnInit(): void {
    this.words$ = this.dictionaryService.getWords();
  }
  
  onToggleShowDeclensions(): void {
    this.areDeclensionsShown = !this.areDeclensionsShown;
  }

  onViewWord(word: Word): void {
    this.router.navigateByUrl(`dictionary/${(encodeURIComponent(word.title))}`);
  }

  onToggleSaveWord(word: Word): void {
    if (this.isSaved(word))
      this.dictionaryService.unsaveWord(word.title);
    else
      this.dictionaryService.saveWord(word.title);
  }

  onApplyFilters(): void {
    if (this.filtersForm.controls.savedWords.value)
      this.words$ = this.dictionaryService.getSavedWords(this.filtersForm.controls.wordTypes.value);
    else
      this.words$ = this.dictionaryService.getWords(undefined, this.filtersForm.controls.wordTypes.value);
  }

  isSaved(word: Word): boolean {
    return this.dictionaryService.isSaved(word.title);
  }
}
