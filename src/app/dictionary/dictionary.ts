import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Word } from '../models/word';
import { DictionaryService } from '../services/dictionary.service';
import { MatTableModule } from '@angular/material/table';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-dictionary',
  imports: [
    MatCardModule,
    MatTableModule,
    TitleCasePipe
  ],
  templateUrl: './dictionary.html',
  styleUrl: './dictionary.scss',
})
export class Dictionary implements OnInit {

  words!: Word[];

  constructor(private dictionaryService: DictionaryService) {}

  ngOnInit(): void {
    this.words = this.dictionaryService.getFilteredWordList();
  }
}
