import { Injectable } from "@angular/core";
import { Word } from "../models/word";
import { Declension } from "../models/declension";
import { CaseDeclension } from "../models/case-declension";
import { WordType } from "../models/word-type.type";

@Injectable({
  providedIn: 'root'
})
export class DeclensionService {

  private words: Word[] = [
    new Word(
      'mężczyzna',
      'man',
      'noun',
      new Declension(
        'mężczy',
        new CaseDeclension('zna', 'źni'),
        new CaseDeclension('zny', 'zn'),
        new CaseDeclension('źnie', 'znom'),
        new CaseDeclension('znę', 'zn'),
        new CaseDeclension('zną', 'znami'),
        new CaseDeclension('źnie', 'znach'),
        new CaseDeclension('zno', 'źni')
      )
    ),
    new Word(
      'przypadek',
      '(1) chance, accident; (2) case (declension); (3) event, case',
      'noun',
      new Declension(
        'przypad',
        new CaseDeclension('ek', 'ki'),
        new CaseDeclension('ku', 'ków'),
        new CaseDeclension('kowi', 'kom'),
        new CaseDeclension('ek', 'ki'),
        new CaseDeclension('kiem', 'kami'),
        new CaseDeclension('ku', 'kach'),
        new CaseDeclension('ku', 'ki')
      )
    ),
    new Word(
      'chora',
      'sick (feminine)',
      'adjective',
      new Declension(
        'chor',
        new CaseDeclension('a', 'e'),
        new CaseDeclension('ej', 'ych'),
        new CaseDeclension('ej', 'ym'),
        new CaseDeclension('ą', 'e'),
        new CaseDeclension('ą', 'ymi'),
        new CaseDeclension('ej', 'ych'),
        new CaseDeclension('a', 'e')
      )
    ),
  ];

  getFilteredWordList(wordType?: WordType): Word[] {
    
    return this.words.filter(
      word => wordType ? word.type === wordType : true
    )
  }
}
