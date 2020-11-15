# JokeAPI Wrapper Changelog

This changelog is not showing the logs for v0.0.5 and previous versions.

1. "Next version" part includes the work done after releasing the last version.
2. **If a change starts with a `[IMP]`, that change requires the user to change their code.**

## Next Version (v0.0.6)

- Now, `idRange` can be passed as just a number to `getJokes`. If passed like that, joke with that id will be returned.
- Changes in types
  - `[IMP]` Type of `requestOptions.flag` changed from `"" | Flag[]` to `Flag[]`.
  - New types added:
    - `ResponseFormat`
    - `JokeType`
    - `Error`
    - `IdRangeObject`
    - `StrObject`
    - `NumberObject`
- Removed the cli tool (excluded from the package.json only)
- Added new dependencies
  - Babel
  - Jest
- Configured tools
  - Prettier
  - EditorConfig
- Tests added for util functions
