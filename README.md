# 🎵 node-musickit-api

> A Node.js wrapper for the Apple Music API.

> [!WARNING]
> **PROJECT ARCHIVED (March 3, 2026)**
> 
> This repository has been officially archived. The project has not been actively maintained, a new version has not been published in nearly five years, and there has been no recent external activity. Furthermore, I no longer use Apple Music or maintain an active Apple Developer account, making it impossible to test or implement new API changes or even validate if the existing code still works.
>
> **Interested in reviving this project?**
> If you are a developer interested in taking over maintenance, forking, or reviving this project, please reach out to me ([@Exerra on GitHub](https://github.com/Exerra)) :)

## 📦 Installation

You can install the package using your preferred package manager:

```bash
npm install node-musickit-api
# or
yarn add node-musickit-api
# or
bun add node-musickit-api
```

## 📖 Documentation

Documentation for this package is available at [musickit.js.org](https://musickit.js.org/#/).

## 🐛 Known Issues & Technical Debt

As active development has ceased, I am documenting the project's current technical debt. If anyone chooses to fork or revive the library, these are the primary architectural issues that require attention:

*   **Code Architecture:** The core codebase requires significant refactoring to align with modern JavaScript standards.
*   **TypeScript Support:** The project lacks TypeScript integration and native type definitions.
*   **Promise API:** Native Promise support should be integrated directly into the core library, rather than being retrofitted via a secondary subpath (`node-musickit-api/promises`).
*   **Route Structuring:** Personalized routing logic is currently isolated within a subpath (`node-musickit-api/personalized`) instead of being cohesively integrated into the main client.
*   **Authentication Flow:** Accessing personalized routes currently relies on an impractical workaround—requiring users to authorize via Apple's official MusicKit.js web library, extract the session token manually, and save it as a local file. A modernized implementation should handle the authentication flow natively.
*   **Session Validation:** There is currently no built-in method to verify an active authentication state without executing a preliminary API query (see [Issue #10](https://github.com/Exerra/node-musickit-api/issues/10)).
