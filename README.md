# LexiPro - Legal Platform

![LexiPro Logo](public/placeholder-logo.jpg)

**Live Demo:** [https://lexipro-platform.vercel.app](https://lexipro-platform.vercel.app)

## About The Project

LexiPro is a comprehensive legal platform designed to streamline case management, client interaction, and legal document generation. It provides a suite of tools for lawyers, clients, and administrators to manage legal workflows efficiently.

## Features

### For Lawyers

*   **Dashboard:** A comprehensive dashboard to manage cases, clients, and appointments.
*   **Case Management:** Track and manage legal cases from start to finish.
*   **Client Management:** Manage client information and communication.
*   **AI Assistant:** An intelligent assistant for legal research, document summarization, and drafting assistance.
*   **AI-Powered Case Triage:** Automatically categorize and prioritize incoming cases based on urgency and specialty.
*   **Predictive Analytics:** Leverage AI to gain insights into potential case outcomes.
*   **Analytics:** Dashboards to visualize case data and firm performance.
*   **Appointment Scheduling:** Manage appointments with clients and colleagues.
*   **Document Generation:** Automatically generate legal documents from templates.
*   **Messaging:** A secure messaging system for communication with clients and colleagues.

### For Clients

*   **Dashboard:** A dedicated portal to view case status and communicate with their lawyer.
*   **AI-Powered Lawyer Matching:** Get recommendations for the best-suited lawyer based on the case details.
*   **Post a Case:** Clients can post new legal cases to the platform.
*   **View Cases:** Clients can track the progress of their cases with AI-powered summaries.
*   **AI Chatbot:** Get instant answers to basic legal questions and platform guidance.
*   **Marketplace:** A marketplace to find and hire legal services.
*   **Messaging:** A secure messaging system for communication with their lawyer.

### General Features

*   **Authentication:** Secure user login and registration for all user types.
*   **Blockchain Integration:** For secure and transparent record-keeping.
*   **Profile Management:** Users can manage their profiles and settings.
*   **Story Mode:** An interactive way to present case information.
*   **Labs:** Access to experimental features like:
    *   **Predictor:** For case outcome predictions.
    *   **Triage:** To assess the urgency of legal matters.

## Tech Stack

*   [Next.js](https://nextjs.org/) - React Framework
*   [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
*   [Tailwind CSS](https://tailwindcss.com/) - Utility-First CSS Framework
*   [Shadcn/ui](https://ui.shadcn.com/) - Re-usable components built using Radix UI and Tailwind CSS.
*   [Mermaid.js](https://mermaid-js.github.io/mermaid/#/) - For diagrams and flowcharts.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

*   pnpm
    ```sh
    npm install -g pnpm
    ```

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username_/Project-Name.git
    ```
2.  Install NPM packages
    ```sh
    pnpm install
    ```
3.  Run the development server
    ```sh
    pnpm run dev
    ```

## Project Structure

```mermaid
graph TD
    A[LEXIPRO] --> B(app);
    A --> C(components);
    A --> D(public);
    A --> E(styles);

    B --> B1(ai-assistant);
    B --> B2(analytics);
    B --> B3(appointments);
    B --> B4(auth);
    B --> B5(blockchain);
    B --> B6(cases);
    B --> B7(client);
    B --> B8(clients);
    B --> B9(dashboard);
    B --> B10(document-generator);
    B --> B11(labs);
    B --> B12(lawyer);
    B --> B13(marketplace);
    B --> B14(messages);
    B --> B15(post-case);
    B --> B16(profile);
    B --> B17(settings);
    B --> B18(story-mode);

    C --> C1(dashboard-layout.tsx);
    C --> C2(footer.tsx);
    C --> C3(navbar.tsx);
    C --> C4(theme-provider.tsx);
    C --> C5(ui);

    subgraph UI Components
        C5 --> C5a(accordion.tsx);
        C5 --> C5b(alert.tsx);
        C5 --> C5c(button.tsx);
        C5 --> C5d(card.tsx);
        C5 --> C5e(dialog.tsx);
        C5 --> C5f(form.tsx);
        C5 --> C5g(input.tsx);
        C5 --> C5h(table.tsx);
    end
