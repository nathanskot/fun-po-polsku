# FunPoPolsku

A toy Angular project to learn polish language with games.

## Description

The app contains a static list of words. These words are used to play a declension quiz in the Declension page, and are displayed in the Dictionary page.

## Model

The `Word` class represents a word and all its relevant data. Its fields are:
- `title: string` : the basic form of the word,
- `translation: string` : its english translation,
- `type: WordType` : either `'noun'` or `'adjective'` for now, other types might be added later,
- `singular: Declension` : its declension for singular forms,
- `plural: Declension` : its declension for plural forms.

The `Declension` class represents the declension of a word. Its fields are all strings, each representing a Polish declension case.

The `DeclensionQuestion` class represents a question in the declension quiz. It contains a word, a list of randomly generated choices and an answer, based on a list of user-chosen filters.

## TODO
- In filters, replace select elements by toggle buttons