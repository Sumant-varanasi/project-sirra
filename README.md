# project-sirra
group therapy organiser SaaS 
disclaimer: as the application was made on a external platform [Base44], the contents of the project includes just frontend code and backend skeletal code. The inner logic for connection 
is yet to be built out thoroughly

# Mental Health Support Platform

A mental health support platform that uses AI-driven assessments to match users with peer support groups.

## Setup & Installation

### Clone and Install

```bash
npm install
```

### Environment

- **Platform**: Base44 (React + Tailwind CSS)
- No additional configuration required - entities and integrations are pre-configured

### Run

```bash
npm run dev
```

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React)                        │
├─────────────────────────────────────────────────────────────────┤
│  Home Page  │  Assessment Flow  │  Availability  │  Community   │
└──────┬──────┴────────┬──────────┴───────┬────────┴──────┬───────┘
       │               │                  │               │
       ▼               ▼                  ▼               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BASE44 BACKEND                             │
├──────────────┬──────────────┬───────────────┬───────────────────┤
│  Entities    │  LLM API     │  Auth         │  Integrations     │
│  (Database)  │  (AI/ML)     │  (Users)      │  (Email, etc.)    │
└──────────────┴──────────────┴───────────────┴───────────────────┘
       │               │
       ▼               ▼
┌──────────────┐ ┌──────────────────────────────────────────────┐
│ UserAssess.  │ │    AI Processing Pipeline                    │
│ UserAvail.   │ │  ┌────────────────────────────────────────┐  │
│ GroupSession │ │  │ Sentiment Analysis                     │  │
└──────────────┘ │  │ Focus Group Prediction                 │  │
                 │  │ TAT Interpretation                     │  │
                 │  │ Risk Assessment                        │  │
                 │  └────────────────────────────────────────┘  │
                 └──────────────────────────────────────────────┘
```

## AI/ML Models & Algorithms

| Component | Model/Approach | Purpose |
|-----------|---------------|---------|
| Focus Group Prediction | LLM (InvokeLLM) | Analyzes open-ended responses to classify users into support groups |
| Sentiment Analysis | LLM with structured output | Maps emotional tone across conversation, tracks emotional trajectory |
| TAT Interpretation | Thematic Apperception Test prompts + LLM | Uncovers unconscious concerns through image-based projective testing |
| Risk Assessment | Keyword detection + LLM analysis | Identifies alert phrases and safety concerns |
| Metrics Generated | ESI, TRI, BLS, GSP scores | Emotion Stability Index, Therapeutic Readiness, Behavioral Loop Strength, Group Synergy Predictor |

## Data Flow

```
User Input → Conversational Assessment → AI Analysis → Report Generation → Group Matching
     │              │                         │              │                  │
     ▼              ▼                         ▼              ▼                  ▼
  Basic Info   Open-ended Q's          Sentiment +      Mentra Report    Weekly Calendar
  (age/gender) + TAT Response          Focus Group      (5 sections)     + Session Match
                                       Classification
```

## Privacy Approach

- **Anonymization**: Users identified by generated IDs, not personal identifiers in reports
- **Confidential Storage**: All assessment data stored in secure Base44 entities
- **No PII in AI Prompts**: Personal details minimized when sent to LLM
- **Transparency Score**: Reports include AI confidence and transparency metrics
- **User Control**: Users control their availability and group participation
- **Local Timezone**: Timezone detected client-side, stored for session matching only

## Entities

- **UserAssessment** - Stores assessment responses, scores, and generated reports
- **UserAvailability** - Weekly time slots for group session scheduling
- **GroupSession** - Matched sessions with 2+ participants
