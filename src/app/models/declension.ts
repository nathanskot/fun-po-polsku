import { CaseDeclension } from "./case-declension";
import { CaseType } from "./case-type.type";

export class Declension {

  constructor(public radical: string,
              public nominative: CaseDeclension,
              public genitive: CaseDeclension,
              public dative: CaseDeclension,
              public accusative: CaseDeclension,
              public instrumental: CaseDeclension,
              public locative: CaseDeclension,
              public vocative: CaseDeclension) {
    this.nominative.setCaseType('nominative');
    this.genitive.setCaseType('genitive');
    this.dative.setCaseType('dative');
    this.accusative.setCaseType('accusative');
    this.instrumental.setCaseType('instrumental');
    this.locative.setCaseType('locative');
    this.vocative.setCaseType('vocative');
  }

  getCaseDeclension(caseType: CaseType): CaseDeclension {
    return this.toArray().filter(caseDeclension => caseDeclension.getCaseType() === caseType)[0];
  }

  toString(): string {
    return `
      ${this.caseToString(this.nominative)}\n
      ${this.caseToString(this.genitive)}\n
      ${this.caseToString(this.dative)}\n
      ${this.caseToString(this.accusative)}\n
      ${this.caseToString(this.instrumental)}\n
      ${this.caseToString(this.locative)}\n
      ${this.caseToString(this.vocative)}\n
    `;
  }

  toArray(): CaseDeclension[] {
    return [
      this.nominative,
      this.genitive,
      this.dative,
      this.accusative,
      this.instrumental,
      this.locative,
      this.vocative
    ];
  }

  private caseToString(caseDeclension: CaseDeclension): string {
    return `${caseDeclension.getCaseType()}: ${this.radical + caseDeclension.singular}, ${this.radical + caseDeclension.plural}`;
  }
}
