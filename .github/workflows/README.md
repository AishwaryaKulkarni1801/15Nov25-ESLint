# GitHub Actions CI/CD Workflow Documentation

## Overview
This workflow provides automated CI/CD for Angular, React, and Vue projects with ESLint validation, Jest coverage checks, and GitHub Pages deployment.

## Workflow Features

### ✅ **Step Execution Order**
1. **Checkout repository** - Uses `actions/checkout@v4`
2. **Setup Node.js** - Uses latest LTS via `actions/setup-node@v4`
3. **Cache dependencies** - Uses `actions/cache@v4` for faster builds
4. **Install dependencies** - Uses `npm ci` for clean installs
5. **ESLint validation** - Runs FIRST (before tests)
6. **Jest tests with coverage** - Validates test results
7. **Coverage validation** - Ensures ≥80% coverage
8. **Framework detection** - Auto-detects Angular/React/Vue
9. **Build project** - Framework-specific build commands
10. **SPA routing fix** - Copies index.html → 404.html
11. **Deploy to GitHub Pages** - Uses `actions/deploy-pages@v4`
12. **Notification** - Reports success/failure status

### 🔍 **ESLint Validation**
- Runs **BEFORE** tests (fail fast approach)
- Uses: `npm run lint`
- **Does NOT auto-fix** - only validates existing code
- Stops workflow immediately if errors found
- Clear error messages in workflow logs

### 🧪 **Test Coverage Validation**
- Runs Jest with: `npm run test -- --coverage --watchAll=false`
- **Does NOT modify tests** - only validates results
- Requires `json-summary` in Jest's `coverageReporters`
- Robust parsing using Node.js (not regex)
- Validates:
  - ✅ Coverage summary file exists
  - ✅ Coverage ≥ 80%
  - ✅ All tests pass
- Graceful error handling with clear messages

### 🌐 **Framework Support**

#### Angular
- Auto-detects from `angular.json`
- Extracts project name and output path dynamically
- Build command: `npm run build -- --base-href '/REPO_NAME/'`
- Output: `dist/<project-name>`

#### React
- Detects from `package.json` (checks for "react")
- Build command: `npm run build`
- Output: `build/` or `dist/`

#### Vue
- Detects from `package.json` (checks for "vue")
- Build command: `npm run build`
- Output: `dist/`

### 📦 **Configuration Requirements**

#### Jest Configuration (`jest.config.js`)
```javascript
module.exports = {
  // ... other config
  coverageReporters: ['html', 'lcov', 'text', 'json-summary'], // ⚠️ Must include 'json-summary'
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.spec.ts',
    // ... exclusions
  ],
};
```

#### Package.json Scripts
```json
{
  "scripts": {
    "lint": "eslint --ext .ts,.js src/",
    "test": "jest --runInBand",
    "build": "ng build" // or react-scripts build, vite build, etc.
  }
}
```

### 🛡️ **Permissions**
```yaml
permissions:
  contents: read      # Read repository
  pages: write        # Deploy to Pages
  id-token: write     # OIDC token for deployment
```

### 🚀 **Triggers**
- **Push to main** - Automatic deployment on every push
- **Workflow dispatch** - Manual trigger from Actions tab

### ⚙️ **Concurrency**
```yaml
concurrency:
  group: "pages"
  cancel-in-progress: true  # Cancels older runs if new push occurs
```

## Usage Instructions

### 1. Initial Setup
```bash
# Initialize Git repository
git init
git add .
git commit -m "Initial project setup"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO_NAME.git
git push -u origin main
```

### 2. Enable GitHub Pages
1. Go to **Repository → Settings → Pages**
2. Under **Source**, select **GitHub Actions**
3. Click **Save**

### 3. Workflow Runs Automatically
- Every push to `main` triggers the workflow
- Check **Actions** tab to monitor progress

## Error Handling

### ESLint Failures
```
❌ Deployment stopped: ESLint validation failed
```
**Solution**: Fix ESLint errors in your code and push again

### Coverage Below 80%
```
❌ Deployment stopped: Code coverage below 80% (Actual: 65%)
```
**Solution**: Add more tests to increase coverage

### Coverage File Missing
```
❌ Coverage summary file not found!
💡 Make sure your Jest config includes 'json-summary' in coverageReporters
```
**Solution**: Add `'json-summary'` to `coverageReporters` in `jest.config.js`

### Test Failures
```
❌ Deployment stopped: Test suite failed
```
**Solution**: Fix failing tests before deploying

## Notification Job

The workflow includes a separate `notify` job that:
- ✅ Always runs (even if previous job fails)
- ✅ Shows clear success/failure messages
- ✅ Indicates specific failure reason
- ✅ Provides deployment URL on success

### Success Message
```
✅ Deployment succeeded! 🎉
📍 Check your site at: https://USERNAME.github.io/REPO_NAME/
```

### Failure Message
```
❌ Deployment failed
📋 Failure reason:
   - One or more steps failed during the build/test/deploy process
   - Check the logs above for specific error details:
     • ESLint validation errors (runs first)
     • Test suite failures
     • Coverage below 80%
     • Build failures
```

## Customization

### Change Coverage Threshold
Edit line in workflow:
```yaml
THRESHOLD=80  # Change to desired percentage (e.g., 90)
```

### Change Base HREF (Angular only)
Edit build command:
```yaml
npm run build -- --base-href '/YOUR_REPO_NAME/'
```

### Add Additional Validation Steps
Insert new steps after dependency installation and before build:
```yaml
- name: Custom validation
  run: |
    npm run your-custom-script
```

## GitHub Actions Versions Used

| Action | Version | Status |
|--------|---------|--------|
| `actions/checkout` | v4 | ✅ Latest |
| `actions/setup-node` | v4 | ✅ Latest |
| `actions/cache` | v4 | ✅ Latest |
| `actions/configure-pages` | v4 | ✅ Latest |
| `actions/upload-pages-artifact` | v3 | ✅ Latest |
| `actions/deploy-pages` | v4 | ✅ Latest |

**No deprecated actions are used in this workflow.**

## Troubleshooting

### Workflow Not Running
- Check if GitHub Actions are enabled in repository settings
- Verify workflow file is in `.github/workflows/` directory
- Ensure YAML syntax is valid

### Deployment Fails After Build
- Verify GitHub Pages is enabled in Settings
- Check if Pages source is set to "GitHub Actions"
- Review permissions in workflow file

### Coverage Parsing Errors
- Ensure `coverage-summary.json` is generated
- Check Jest configuration includes `json-summary` reporter
- Verify Node.js can parse the JSON file

## License
This workflow configuration is provided as-is for use in your projects.
