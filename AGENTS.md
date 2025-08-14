# AGENTS.md

This document contains notes and instructions for AI agents working on this codebase.

## Project Overview

This is a web application built with the following technologies:

*   **Framework/Tooling:** React, TypeScript, Vite
*   **Routing:** `react-router-dom`
*   **Styling:** Tailwind CSS
*   **Linting:** ESLint

## Project Structure

The codebase is organized as follows:

*   `src/main.tsx`: The main entry point for the application.
*   `src/App.tsx`: The root component that sets up the application's routing.
*   `src/pages/`: This directory contains the main page components of the application (e.g., `Home.tsx`, `About.tsx`).
*   `src/components/`: This directory holds reusable components used across different pages (e.g., `Navbar.tsx`, `Footer.tsx`).
*   `public/`: Static assets that are served directly.
*   `assets/`: Assets that are processed by Vite.

## Development Scripts

The following scripts are available in `package.json`:

*   `npm run dev`: Starts the development server with Hot Module Replacement (HMR).
*   `npm run build`: Compiles the TypeScript code and builds the application for production.
*   `npm run lint`: Runs the ESLint linter to check for code quality issues.
*   `npm run preview`: Starts a local server to preview the production build.

## Task Execution Procedure

Here is a typical workflow for completing a task in this repository.

1.  **Install Dependencies:**
    If this is your first time working on the project, or if dependencies have changed, install the necessary Node.js modules.
    ```bash
    npm install
    ```

2.  **Start the Development Server:**
    To see your changes in real-time, start the Vite development server.
    ```bash
    npm run dev
    ```
    The application will typically be available at `http://localhost:5173`.

3.  **Implement Changes:**
    *   Locate the relevant files for your task, likely within the `src` directory.
    *   Pages are located in `src/pages`.
    *   Reusable components are in `src/components`.
    *   Make the required code modifications.

4.  **Lint and Test:**
    Before finalizing your changes, ensure your code adheres to the project's style guidelines and that all tests pass.
    ```bash
    npm run lint
    npm test
    ```
    Fix any errors or warnings reported by the linter and ensure all tests pass.

    **Important:** When adding new features (e.g., new components, new logic), you **must** add corresponding tests to validate their functionality.

5.  **Verify Production Build (Optional):**
    It's a good practice to confirm that the application builds successfully for production.
    ```bash
    npm run build
    npm run preview
    ```

6.  **Review `AGENTS.md`:**
    Consider if your changes require updates to this document. For example, if you add a new dependency, a new build step, or change the project structure. If so, please update this file accordingly.

7.  **Submit Your Work:**
    Once you are confident in your changes:
    a. Use the `request_code_review()` tool to get feedback on your work.
    b. Address any suggested changes.
    c. Use the `submit()` tool to commit your changes with a clear, descriptive message.
