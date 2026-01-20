import { CaseType } from "./case-type.type";

export class Declension {

  constructor(public nominative: string,
              public genitive: string,
              public dative: string,
              public accusative: string,
              public instrumental: string,
              public locative: string,
              public vocative: string) {}

  // getCaseDeclension(caseType: CaseType): CaseDeclension {
  //   return this.toArray().filter(caseDeclension => caseDeclension.getCaseType() === caseType)[0];
  // }

  // toString(): string {
  //   return `
  //     ${this.caseToString(this.nominative)}\n
  //     ${this.caseToString(this.genitive)}\n
  //     ${this.caseToString(this.dative)}\n
  //     ${this.caseToString(this.accusative)}\n
  //     ${this.caseToString(this.instrumental)}\n
  //     ${this.caseToString(this.locative)}\n
  //     ${this.caseToString(this.vocative)}\n
  //   `;
  // }

  // toArray(): CaseDeclension[] {
  //   return [
  //     this.nominative,
  //     this.genitive,
  //     this.dative,
  //     this.accusative,
  //     this.instrumental,
  //     this.locative,
  //     this.vocative
  //   ];
  // }

  // private caseToString(caseDeclension: CaseDeclension): string {
  //   return `${caseDeclension.getCaseType()}: ${this.radical + caseDeclension.singular}, ${this.radical + caseDeclension.plural}`;
  // }

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
