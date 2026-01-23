import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Word } from '../models/word';
import { DictionaryService } from '../services/dictionary.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-single-word',
  imports: [
    AsyncPipe
  ],
  templateUrl: './single-word.html',
  styleUrl: './single-word.scss',
})
export class SingleWord implements OnInit {

  word$!: Observable<Word>;

  constructor(private dictionaryService: DictionaryService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.getWord();
  }

  private getWord() {
    const title = decodeURIComponent(this.route.snapshot.params['title']);
    this.word$ = this.dictionaryService.getWord(title);
  }
}
