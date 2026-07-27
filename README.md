# flowXtract

An AI-powered multi-agent web data extraction application that automatically extracts publicly available website data, cleans and organizes it, stores it in Google Sheets, and delivers the results to the user via email.

---

# Problem It Solves

Collecting structured data from websites manually is repetitive, time-consuming, and often requires technical scraping knowledge.

flowXtract solves this problem by allowing users to simply enter:

- A website URL
- The data they want to extract
- Their email address

The system automatically analyzes the website, extracts the requested publicly available data, cleans and structures it, stores it in Google Sheets, and emails the final results.

### Target Users

- Researchers
- Businesses
- Freelancers
- Sales & Marketing Teams
- E-commerce Professionals
- Real Estate Professionals
- Students & Developers

---



## Live Application

🔗 [**Live Demo**](https://flowxtract-landing-page-build.vercel.app)



---

# Features

- AI-powered multi-agent workflow
- Automatic website analysis
- Supports both static and dynamic websites
- Intelligent extraction strategy selection
- Browserless support for JavaScript-rendered websites
- Custom data extraction based on user requirements
- Automatic data cleaning and validation
- Dynamic Google Sheets generation
- Email delivery with Google Sheet link and Excel attachment
- End-to-end workflow automation
- Simple and user-friendly interface

---

# AI Feature

flowXtract is built using a modular multi-agent architecture coordinated by a central Master Agent.

### Master Agent
- Validates user requests
- Orchestrates the complete workflow
- Coordinates all AI agents
- Handles workflow routing and error handling

### Website Analyzer Agent
- Detects website category
- Identifies rendering type
- Recommends the appropriate extraction strategy

### Scraper Agent
- Extracts publicly available website data
- Supports both static and Browserless-powered dynamic extraction

### Data Cleaner Agent
- Removes duplicates
- Cleans and standardizes extracted data
- Validates output

### Data Store Agent
- Creates Google Sheets automatically
- Stores cleaned data
- Sends email with Google Sheet link and Excel attachment

The AI agents are powered using **OpenAI GPT-4.1 Mini** and orchestrated through **n8n AI Agent workflows**.

---

# Tools, Services & AI Models

- n8n
- OpenAI GPT-4.1 Mini
- Browserless
- JavaScript
- HTTP Request
- Google Sheets
- Gmail
- Lovable AI
- GitHub
- Vercel
- n8n Cloud

---

# Screenshots

## Landing Page

![Landing Page](images/landing-page.png)

---

## Data Extraction Form

![Extraction Form](images/extraction-form.png)

---

## n8n Multi-Agent Workflow

![Workflow](images/workflow.png)

---

## Successful Workflow Execution

![Execution](images/workflow-execution.png)

---

## Email Delivery

![Email](images/email-delivery.png)

---

## Generated Google Sheet

![Google Sheet](images/google-sheet.png)

---

# How to Run

1. Open the live application.
2. Enter a public website URL.
3. Describe the data you want to extract.
4. Enter your email address.
5. Click **Start Extraction**.
6. The backend automatically:
   - Analyzes the website
   - Selects the extraction strategy
   - Extracts the requested data
   - Cleans the results
   - Creates a Google Sheet
   - Sends the final results via email

---



**#Google Docs.Links**

## Project Documents

📄 [**Master Workflow JSON**](https://docs.google.com/document/d/1K-sQVu6sMdwBFBMNdmzC7VsFlDFfJSTtobhvL1MHfcQ/edit?usp=sharing)

📄 [**Project Documentation**](https://docs.google.com/document/d/1_DpdePSH4sknlYrxNXqO8Fds3wrCyUder68etikXLSM/edit?usp=sharing)



---

# Author

**Tabinda Fatima**

ACT AI Final Project – 2026
