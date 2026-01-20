import { Injectable } from "@angular/core";
import { Word } from "../models/word";
import { WordType } from "../models/word-type.type";
import { randomize } from "../app.utils";
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { CaseType } from "../models/case-type.type";
import { DeclensionQuestion } from "../models/declension-question";

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  private apiUrl = '/data/words.json';

  constructor(private http: HttpClient) {}

  getWords(): Observable<Word[]> {
    return this.http.get<Word[]>(this.apiUrl).pipe(
      map(words => words.map(Word.fromDto))
    );
  }

  getRandomWords(amount?: number, wordTypes?: WordType[]): Observable<Word[]> {
    return this.http.get<Word[]>(this.apiUrl).pipe(
      map((words): Word[] => randomize(words)),
      map(words => words.filter(word => wordTypes ? wordTypes.includes(word.type) : true)),
      map(words => words.slice(0, amount)),
      map(words => words.map(Word.fromDto))
    );
  }

  getDeclensionQuestions(amount: number, wordTypes: WordType[], caseTypes: CaseType[]): Observable<DeclensionQuestion[]> {
    return this.getRandomWords(amount, wordTypes).pipe(
      map(words => words.map(word =>
        new DeclensionQuestion(word, caseTypes)
      ))
    );
  }
}
