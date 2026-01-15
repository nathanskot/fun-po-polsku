import { CaseType } from "./case-type.type";
import { Declension } from "./declension";
import { GrammaticalNumber } from "./grammatical-number.type";
import { WordType } from "./word-type.type";

export class Word {

  constructor(public str: string,
              public translation: string,
              public type: WordType,
              public declension: Declension) {}

  getInflection(caseType: CaseType, number: GrammaticalNumber): string {
    return this.declension.getCaseDeclension(caseType).getInflection(number);
  }

  getInflectedWord(caseType: CaseType, number: GrammaticalNumber): string {
    return this.declension.radical + this.getInflection(caseType, number);
  }

  toString(): string {
    return `
      ${this.str} (${this.type}): ${this.translation}\n
      ${this.declension}
    `;
  }
}
