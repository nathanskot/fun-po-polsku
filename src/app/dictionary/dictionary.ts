import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Word } from '../models/word';
import { DictionaryService } from '../services/dictionary.service';
import { MatTableModule } from '@angular/material/table';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { CaseType, caseTypeLabels } from '../models/case-type.type';

@Component({
  selector: 'app-dictionary',
  imports: [
    MatCardModule,
    MatTableModule,
    TitleCasePipe,
    AsyncPipe
  ],
  templateUrl: './dictionary.html',
  styleUrl: './dictionary.scss',
})
export class Dictionary implements OnInit {

  words$!: Observable<Word[]>;
  caseTypes: CaseType[] = Object.values(caseTypeLabels);

  constructor(private dictionaryService: DictionaryService) {}

  ngOnInit(): void {
    this.words$ = this.dictionaryService.getWords();
  }
}
