import { CaseType } from "./case-type.type";

export class Declension {

  constructor(public nominative: string,
              public genitive: string,
              public dative: string,
              public accusative: string,
              public instrumental: string,
              public locative: string,
              public vocative: string) {}

  static fromDto(dto: {
    nominative: string;
    genitive: string;
    dative: string;
    accusative: string;
    instrumental: string;
    locative: string;
    vocative: string;
  }): Declension {
    return new Declension(
      dto.nominative,
      dto.genitive,
      dto.dative,
      dto.accusative,
      dto.instrumental,
      dto.locative,
      dto.vocative
    );
  }

  getInflection(caseType: CaseType): string {
    switch (caseType) {
      case 'nominative':
        return this.nominative;
      case 'genitive':
        return this.genitive;
      case 'dative':
        return this.dative;
      case 'accusative':
        return this.accusative;
      case 'instrumental':
        return this.instrumental;
      case 'locative':
        return this.locative;
      case 'vocative':
        return this.vocative;
      default:
        throw new Error('Invalid case type');
    }
  }
}
