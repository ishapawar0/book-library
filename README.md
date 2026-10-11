# 📚 Personal Book Library & Unit Testing Sandbox

A full-stack, serverless web application built to master modern backend architectures and isolated automated testing pipelines. The application allows users to log in securely, track their personal reading lists, and perform instant runtime logic evaluations.

## 🚀 Key Learning Objectives
* **Backend Architecture:** Orchestrated a serverless database lifecycle using Next.js Server Actions and Supabase PostgreSQL.
* **Database Security:** Implemented Row-Level Security (RLS) firewalls directly on database tables to guarantee isolated user data environments.
* **Automated Unit Testing:** Integrated **Vitest** to build a continuous integration validation layer using the industry-standard **AAA (Arrange-Act-Assert)** pattern.
* **Dependency Orchestration:** Resolved real-world package tree conflicts (`ERESOLVE`) manually inside the runtime environment.

## ⚙️ Tech Stack
* **Framework:** Next.js (App Router, Server Actions, TypeScript)
* **Database & Auth:** Supabase (PostgreSQL, Row-Level Security, Magic Link Authentication)
* **Testing Suite:** Vitest Engine, JSDOM Environment

## 🧪 Running The Unit Tests
To fire up the isolated backend logic test suite in watch mode:
```bash
npm run test
```
