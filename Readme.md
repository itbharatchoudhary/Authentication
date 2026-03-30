# Authentication System – Project Overview

This project implements a full-stack authentication system, combining **manual authentication** and **OAuth login via Google**. The system ensures secure user registration, login, and session management using modern web technologies. The project is organized into **backend** and **frontend** modules, each documented separately for clarity.

---

## 1. Backend

The backend handles **user data, authentication logic, token management, and database interaction**.

### Key Notes

* The backend documentation (`Readme.md`) explains project setup, folder structure, and core functionality.
* It includes instructions for connecting to the database, configuring environment variables, and managing JWT-based authentication.
* Implements **manual authentication** for username/password login.
* Supports **Google OAuth login** for seamless third-party authentication.
* Logs and error handling are managed for debugging and monitoring purposes.

### Terminal Commands

* All backend setup, build, and development commands are captured in `TerminalCommands.md`.
* Commands include:

  * Installing dependencies
  * Running the development server
  * Database connection checks
  * Building and deploying backend services

---
[BackendNotes-Readme-File](Notes/BackendNotes/Readme.md)

[Terminal-commands-of-Backend](Notes/BackendNotes/TerminalCommands.md)



## 2. Frontend

The frontend provides a **user interface** for registration, login, and profile management, integrating directly with the backend APIs.

### Key Notes

* The frontend documentation (`Readme.md`) covers project structure, routing, state management, and UI components.
* Tailwind CSS is used for **responsive and modern styling**, including light and dark themes.
* Components are organized with reusable hooks and services for API communication.
* Integrates **Google OAuth login** alongside manual authentication forms.
* Provides pages for home, login, registration, and user profile management.

### Terminal Commands

* The frontend commands are documented in `TerminalCommands.md`.
* Commands include:

  * Project creation with Vite
  * Installing required libraries (React, Axios, Tailwind, OAuth integration)
  * Running the development server
  * Building for production

---

[FrontendNotes-Readme-File](Notes/FrontendNotes/Readme.md)

[Terminal-commands-of-Frontend](Notes/FrontendNotes/TerminalCommands.md)