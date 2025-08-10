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

### 4. Set Up Automation Rules ⚠️ (Manual Setup Required)
Once you create the Project board, configure these automation rules in Project Settings:
- Auto-move to "In Progress" when issue assigned
- Auto-move to "Done" when issue closed
- Auto-add alpha label based on milestone

*Note: These automation rules cannot be configured via CLI and require manual setup in the GitHub web interface.*

### 5. Create Milestones ✅ (Completed)
All milestones have been created:
- [Alpha 1 - Core Mechanics](https://github.com/jedundon/bloodstream-survivors/milestone/1) (due Aug 31)
- [Alpha 2 - Progression System](https://github.com/jedundon/bloodstream-survivors/milestone/2) (due Sep 21)
- [Alpha 3 - Full Weapon Set + UI](https://github.com/jedundon/bloodstream-survivors/milestone/3) (due Oct 19)
- [Alpha 4 - Enemy Variety + Bosses](https://github.com/jedundon/bloodstream-survivors/milestone/4) (due Nov 16)
- [Alpha 5 - Polish + Meta-progression](https://github.com/jedundon/bloodstream-survivors/milestone/5) (due Dec 21)

## Setup Status Summary

✅ **Completed via CLI:**
- All 5 milestones with descriptions and due dates
- All priority, component, and alpha labels
- 19 initial GitHub issues across all alphas
- Issue templates for consistent formatting

⚠️ **Requires Manual Setup:**
- GitHub Project board creation (web UI only)
- Project board automation rules
- Linking issues to project board columns