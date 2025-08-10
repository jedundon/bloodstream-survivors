# GitHub Project Board Setup Instructions

## Manual Setup Required

Since GitHub Project boards cannot be created via CLI, follow these steps:

### 1. Create New Project Board
1. Go to your repository on GitHub
2. Click "Projects" tab → "Link a project" → "Create new project"
3. Choose "Team planning" template
4. Name: "Bloodstream Survivors Development"

### 2. Configure Columns/Swimlanes
- **Backlog**: Unassigned issues awaiting prioritization
- **To Do**: Issues assigned to current alpha milestone
- **In Progress**: Currently being worked on (limit 2-3 items)
- **Code Review**: Ready for review/testing
- **Alpha Testing**: Deployed for product validation
- **Done**: Completed and validated

### 3. Set Up Labels
Create these labels in Issues → Labels:

**Priority Labels:**
- `priority: critical` (red) - Blocking alpha release
- `priority: high` (orange) - Core feature
- `priority: medium` (yellow) - Enhancement
- `priority: low` (green) - Nice to have

**Component Labels:**
- `component: player` (blue)
- `component: weapons` (purple) 
- `component: enemies` (red)
- `component: ui` (cyan)
- `component: audio` (pink)
- `component: systems` (gray)

**Alpha Labels:**
- `alpha-1` through `alpha-5` (different colors)
- `alpha-ready` (green) - Ready for alpha testing

### 4. Set Up Automation Rules
- Auto-move to "In Progress" when issue assigned
- Auto-move to "Done" when issue closed
- Auto-add alpha label based on milestone

### 5. Create Milestones
Use the milestone definitions that will be generated in the next step.