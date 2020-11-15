# JokeAPI Wrapper Changelog

This changelog is not showing the logs for v0.0.5 and previous versions.

1. "Next version" part includes the work done after releasing the last version.
2. **If a change starts with a `[IMP]`, that change requires the user to change their code.**

## Next Version (v0.0.6)

- Changes in types
  - `[IMP]` Type of `requestOptions.flag` changed from `"" | Flag[]` to `Flag[]`.
  - New types added: `ResponseFormat`, `JokeType`, `Error`, `StrObject`, `NumberObject`
- Added new dependencies
  - Babel
  - Jest
- Configured some tools
  - Prettier
  - EditorConfig
- Tests added for util functions
- Removed the cli tool (excluded from the package.json only)