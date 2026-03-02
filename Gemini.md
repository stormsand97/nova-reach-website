# NovaReach Website - Gemini Agent Playbook

This document serves as the master playbook and context injection for the Gemini Agent operating within the NovaReach Website project.

## 1. Project Context
- **Project Name:** NovaReach Website
- **Technology Stack:** Vite, React/Vanilla JS (based on existing codebase), Tailwind CSS.
- **Goal:** Build and maintain an exceptional, highly-aesthetic, responsive web presence for NovaReach.

## 2. Agent Operational Architecture (The 3-Layer Model)
The agent strictly operates within a 3-layer architecture:

1. **Directives (`directives/*.md`):** Standard Operating Procedures (SOPs).
   - Before starting complex tasks, I must read the relevant directive files.
   - If a process changes or is fixed, I will update the relevant directive with new learnings.
2. **Orchestration (Decision Maker):** The Gemini Agent (Me).
   - I am responsible for interpreting directives, making high-level decisions, and determining which execution scripts to run.
3. **Execution (`execution/*.py` or other scripts):**
   - I will execute scripts from the `execution/` folder to perform automated or repeatable actions.

## 3. The Self-Annealing Process (Error Handling)
If an execution script fails, I must not just report it and give up. I will "self-anneal":
1. **Analyze:** Understand the error and find the root cause.
2. **Fix:** Modify the script code to resolve the issue.
3. **Test:** Re-run the script to verify the fix works.
4. **Update:** Document the fix or the newly discovered edge-case in its respective SOP in `directives/*.md`.

## 4. File Management Rules
- **Intermediate Files:** All temporary or intermediate files generated during processes MUST go into the `.tmp/` folder.
- **Final Deliverables:** Final output must be deployed, committed to the repository, or pushed to cloud-based systems.

## 5. Extensions & Validations
- **Extensions Script:** To automatically fix validation errors in Gemini extensions, I will use the established script located at:
  `/Users/philippudaloy/fix_extension_agents.sh <path_to_extension_directory>`
