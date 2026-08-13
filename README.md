# Artistic Echoes

Artistic Echoes is a full-stack web application for exploring historical and classical artwork through The Metropolitan Museum of Art Collection API.

The project was built as an exploration of API integration, persistent user data, authentication, database-backed features, and responsive application design using Next.js and TypeScript.

> **Project status:** Artistic Echoes is currently undergoing a technical recovery and modernization process. The application was originally deployed successfully, but parts of the data layer now require repair after changes to its database infrastructure. The recovery process is being documented as an engineering debugging case study.

---

## Overview

Artistic Echoes provides an interactive interface for discovering public-domain artwork from The Metropolitan Museum of Art.

Rather than functioning only as a static gallery, the application combines external API data with application-managed user data, allowing the project to explore the interaction between third-party services, authentication, database persistence, and frontend state.

---

## Features

- Browse artwork provided by The Metropolitan Museum of Art Collection API.

- Display artwork metadata and imagery from an external API.

- User authentication and account-aware application behavior.

- Save and retrieve favorite artworks associated with users.

- Database-backed persistence for application-specific user data.

- API routes for communication between the application and persistence layer.

- Responsive interface built for desktop and mobile experiences.

- Supporting About, Contact, and licensing information.

---

## Technology Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- Supabase
- The Metropolitan Museum of Art Collection API
- Jest
- Vercel

---

## Architecture

Artistic Echoes combines two primary data sources.

The Metropolitan Museum of Art Collection API provides public artwork information and imagery, while the application's own persistence layer manages user-specific data such as saved artwork.

The application uses Next.js for both the frontend experience and server-side application routes, Prisma as the database access layer, and PostgreSQL for persistent application data.

This separation between external artwork data and internally managed user data makes the project useful for exploring API integration, persistence, authentication, and failure boundaries across multiple services.

---

## Testing

The project includes Jest configuration and automated testing introduced during development.

Testing work will continue as part of the application's recovery process, with particular attention to business behavior, API boundaries, regression protection, and critical user workflows.

---

## Engineering Recovery & Debugging

Artistic Echoes is also being used as a practical debugging and software recovery project.

After its original development and deployment, changes to the application's database infrastructure left parts of the production system unable to operate as originally designed.

Instead of rebuilding the application from scratch, the recovery process focuses on systematically investigating the existing system:

- Reproducing failures and recording observable behavior.
- Forming hypotheses about database, ORM, configuration, and application-layer failures.
- Testing each hypothesis against the existing codebase and runtime behavior.
- Repairing or replacing failed infrastructure while preserving working application behavior.
- Adding regression protection where appropriate.
- Documenting technical decisions, results, and lessons learned.

The investigation is being maintained as a structured engineering debugging log and will eventually become a complete case study covering the diagnosis, recovery, and modernization of the application.

---

## Current Status

The source code and original application architecture remain available in this repository.

The current engineering objective is to restore the persistence layer, verify application behavior, identify additional regressions, and return the application to a reliable deployable state.

The existing codebase is intentionally being investigated rather than replaced so that the debugging process reflects the constraints of maintaining and recovering a real existing system.

---

## Local Development

Clone the repository:

```bash
git clone https://github.com/danielFernandezDj/artistic-echoes.git
cd artistic-echoes
npm install
