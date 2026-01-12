import { CaseDeclension } from "./case-declension";

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
}
