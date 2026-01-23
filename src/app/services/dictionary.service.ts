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

  private wordsApiUrl = '/data/words.json';
  private savedWordsApiUrl = '/data/saved-words.json';

  private savedWords: string[] = [];

  constructor(private http: HttpClient) {
    this.http.get<string[]>(this.savedWordsApiUrl).subscribe(words => {
      this.savedWords = words;
    });
  }

  getWords(titles?: string[], wordTypes?: WordType[]): Observable<Word[]> {
    return this.http.get<Word[]>(this.wordsApiUrl).pipe(
      map(words => words.filter(word => titles ? titles.includes(word.title) : true)),
      map(words => words.filter(word => wordTypes ? wordTypes.includes(word.type) : true)),
      map(words => words.map(Word.fromDto))
    );
  }

  getWord(title: string): Observable<Word> {
    return this.getWords().pipe(
      map(words => words.filter(word => word.title === title)),
      map(words => words[0])
    );
  }

  getRandomWords(amount?: number, wordTypes?: WordType[]): Observable<Word[]> {
    return this.http.get<Word[]>(this.wordsApiUrl).pipe(
      map((words): Word[] => randomize(words)),
      map(words => words.filter(word => wordTypes ? wordTypes.includes(word.type) : true)),
      map(words => words.slice(0, amount)),
      map(words => words.map(Word.fromDto))
    );
  }

  getSavedWords(wordTypes?: WordType[]): Observable<Word[]> {
    return this.getWords(this.savedWords, wordTypes);
  }

  saveWord(title: string): void {
    if (!this.isSaved(title)) {
      this.http.post(`${this.savedWordsApiUrl}/${encodeURIComponent(title)}`, title);
      this.savedWords.push(title);
    }
  }

  unsaveWord(title: string): void {
    this.http.delete(`${this.savedWordsApiUrl}/${encodeURIComponent(title)}`)
    this.savedWords = this.savedWords.filter(savedWord => savedWord !== title);
  }

  isSaved(title: string): boolean {
    return this.savedWords.includes(title);
  }

  getDeclensionQuestions(amount: number, wordTypes: WordType[], caseTypes: CaseType[]): Observable<DeclensionQuestion[]> {
    return this.getRandomWords(amount, wordTypes).pipe(
      map(words => words.map(word =>
        new DeclensionQuestion(word, caseTypes)
      ))
    );
  }
}
