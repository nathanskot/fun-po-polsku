import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Word } from '../models/word';
import { DictionaryService } from '../services/dictionary.service';
import { AsyncPipe } from '@angular/common';
import { WordList } from '../word-list/word-list';

@Component({
  selector: 'app-saved-words',
  imports: [
    AsyncPipe,
    WordList
  ],
  templateUrl: './saved-words.html',
  styleUrl: './saved-words.scss',
})
export class SavedWords implements OnInit {

  words$!: Observable<Word[]>;

  constructor(private dictionaryService: DictionaryService) {}

  ngOnInit(): void {
    this.words$ = this.dictionaryService.getSavedWords();
  }
}
