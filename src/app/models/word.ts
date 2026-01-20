import { CaseType } from "./case-type.type";
import { Declension } from "./declension";
import { GrammaticalNumber } from "./grammatical-number.type";
import { WordType, wordTypeLabels } from "./word-type.type";

export class Word {

  constructor(public title: string,
              public translation: string,
              public type: WordType,
              public singular: Declension,
              public plural: Declension) {}

  static fromDto(dto: {
    title: string;
    translation: string;
    type: string;
    singular: any;
    plural: any;
  }): Word {
    let type = wordTypeLabels[dto.type];

    if (!type)
      throw new Error('Invalid DTO for Word');

    return new Word(
      dto.title,
      dto.translation,
      type,
      Declension.fromDto(dto.singular),
      Declension.fromDto(dto.plural)
    );
  }

  getInflectedWord(caseType: CaseType, number: GrammaticalNumber): string {
    return this.getDeclension(number).getInflection(caseType);
  }

  getDeclension(number: GrammaticalNumber): Declension {
    if (number === 'singular')
      return this.singular;
    else if (number === 'plural')
      return this.plural;
    else
      throw new Error('Invalid grammatical number');
  }

  toString(): string {
    return `
      ${this.title} (${this.type}): ${this.translation}\n
      Singular:\n${this.singular}\n
      Plural:\n${this.plural}
    `;
  }
}
