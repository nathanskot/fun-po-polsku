export type CaseType = 'nominative'
                     | 'genitive'
                     | 'dative'
                     | 'accusative'
                     | 'instrumental'
                     | 'locative'
                     | 'vocative';

export const caseTypes: { [caseTypeStr: string]: CaseType } = {
  'nominative': 'nominative',
  'genitive': 'genitive',
  'dative': 'dative',
  'accusative': 'accusative',
  'instrumental': 'instrumental',
  'locative': 'locative',
  'vocative': 'vocative'
}
