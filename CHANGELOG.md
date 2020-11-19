# JokeAPI Wrapper Changelog

This changelog is not showing the logs for v0.0.5 and previous versions.

1. "Next version" part includes the work done after releasing the last version.
2. **If a change starts with a `[IMP]`, that change requires the user to change their code.**

## 0.0.8 - Next Version

- New endpoints added
  - `/info`
  - `/categories`
  - `/langcode`
- Bug fixes
  - `getJokes()` was not giving the correct response. It is fixed now.
- License changed from `ISC` to `GPL-3.0-only`

## 0.0.7 - Latest Version

- Fixes 0.0.6.  
  on version 0.0.6, `dist` folder was missing in the published package.

## 0.0.6

- Browser builds are added.
- Added support for `/formats` endpoint added. (other endpoints will be added shortly)
- Now, `idRange` can be passed as just a number to `getJokes`. If passed like that, joke with that id will be returned.
- Changes in types
  - `[IMP]` Types renamed:
    - `requestOptions` --> `RequestOptions`
    - `strictRequestOptions` --> `StrictRequestOptions`
  - `[IMP]` Type of `RequestOptions.flag` changed from `"" | Flag[]` to `Flag[]`.
  - New types added:
    - `ResponseFormat`
    - `JokeType`
    - `Error`
    - `IdRangeObject`
    - `StrObject`
    - `NumberObject`
- Endpoints are moved into a new directory `src/endpoints` (working towards a better file structure)
- Removed the cli tool
- Added new dependencies
  - Babel
  - Jest
- Configured tools
  - Prettier
  - EditorConfig
- Tests added for util functions
