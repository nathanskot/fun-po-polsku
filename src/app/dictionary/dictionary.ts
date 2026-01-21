import { Component, OnInit } from '@angular/core';
import { Word } from '../models/word';
import { DictionaryService } from '../services/dictionary.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { WordList } from "../word-list/word-list";

@Component({
  selector: 'app-dictionary',
  imports: [
    AsyncPipe,
    WordList
],
  templateUrl: './dictionary.html',
  styleUrl: './dictionary.scss',
})
export class Dictionary implements OnInit {

  words$!: Observable<Word[]>;

  constructor(private dictionaryService: DictionaryService) {}

  ngOnInit(): void {
    this.words$ = this.dictionaryService.getWords();
  }
}
