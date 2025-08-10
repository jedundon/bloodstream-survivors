# Development Workflow for Junior Developers

## Getting Started

### Initial Setup
1. Clone repository and run `npm install`
2. Review the comprehensive documentation in `/docs/` folder
3. Read `CLAUDE.md` for development commands and architecture
4. Run `npm run dev` to start development server
5. Run `npm test` to ensure all tests pass

### Daily Development Workflow

#### 1. Task Selection
- Check GitHub Project board for "To Do" items
- Pick ONE issue from current alpha milestone
- Move issue to "In Progress" column
- Assign yourself to the issue

#### 2. Implementation Process
- Create feature branch: `git checkout -b feature/issue-number-description`
- Read PRD sections referenced in issue
- Review existing code patterns in similar components
- Implement following the acceptance criteria exactly
- Write tests for new functionality
- Run development commands to validate:
  ```bash
  npm run lint          # Check code style
  npm run type-check    # Verify TypeScript
  npm test              # Run test suite
  npm run dev           # Test in browser
  ```

#### 3. Testing & Validation
- Test all acceptance criteria manually
- Verify no existing functionality is broken
- Check performance (should maintain 60 FPS)
- Test on different screen sizes if UI-related
- Run full test suite: `npm test`

#### 4. Code Review Process
- Push feature branch to GitHub
- Create Pull Request using template
- Move issue to "Code Review" column
- Address feedback and re-test
- Merge only when all checks pass

### Alpha Build Validation

#### Before Alpha Release
- [ ] All milestone issues completed
- [ ] No critical or high-priority bugs
- [ ] Performance targets met
- [ ] Manual testing of complete alpha scope
- [ ] Alpha validation issue created and tested

#### Alpha Testing Process
1. Deploy to staging environment
2. Create Alpha Validation issue from template
3. Conduct thorough testing session (30+ minutes)
4. Gather feedback on specific validation areas
5. Document any issues discovered
6. Make go/no-go decision for alpha release

#### Product Validation Questions
**Alpha 1:** Does the core loop feel fun? Is movement responsive?
**Alpha 2:** Is progression rewarding? Do upgrades feel meaningful?
**Alpha 3:** Is there enough weapon variety? Is UI clear?
**Alpha 4:** Are boss fights engaging? Is difficulty curve right?
**Alpha 5:** Does meta-progression motivate replay? Performance acceptable?

### Issue Management Best Practices

#### Writing Good Issues
- Reference specific PRD sections and line numbers
- Include all acceptance criteria as checkboxes
- Add screenshots or mockups for UI work
- Specify exact numerical values from PRD
- Include testing instructions

#### Labels and Organization
- Use component labels to group related work
- Set appropriate priority based on alpha goals
- Link related issues with "Depends on #123" comments
- Update issue descriptions as requirements clarify

#### Time Management
- Break large features into multiple issues (max 3 days each)
- Create sub-tasks for complex features
- Update progress with frequent comments
- Ask for help if blocked for more than 1 day

### Common Pitfalls to Avoid

#### Technical Debt
- Don't skip object pooling for performance-critical systems
- Follow TypeScript strictly (no `any` types)
- Write tests for game logic and calculations
- Keep data-driven approach (JSON configs, not hardcoded values)

#### Scope Creep
- Stick exactly to acceptance criteria
- Resist urge to add "quick improvements"
- Save enhancement ideas for future alpha milestones
- Focus on current alpha goals only

#### Testing Shortcuts
- Always test manually in addition to unit tests
- Test edge cases (0 HP, max enemies, etc.)
- Verify performance with realistic load
- Check all acceptance criteria before marking complete

### Communication Guidelines

#### Daily Updates
- Comment on in-progress issues with status updates
- Ask questions early if requirements are unclear
- Share screenshots/recordings of new features
- Report any blockers immediately

#### Alpha Feedback
- Document gameplay feel and balance concerns
- Suggest improvements for future alphas
- Report performance issues with specific scenarios
- Gather external feedback and share insights

### Resources and References
- **PRD:** `/docs/bloodstream_survivors_prd.md` - Complete feature specifications
- **Architecture:** `/docs/ARCHITECTURE.md` - System design patterns
- **Testing:** `/docs/TESTING_GUIDE.md` - Testing approach and examples
- **Phaser Patterns:** `/docs/PHASER_PATTERNS.md` - Framework best practices
- **CLAUDE.md:** Project-specific development commands and conventions