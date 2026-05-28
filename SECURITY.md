# Security Best Practices

## Preventing Sensitive Data Leaks

### 1. **Environment Variables**
- Never commit API keys, passwords, or tokens directly in code
- Use `.env` files (local only, not committed) for development
- Use `.env.example` as a template showing required variables
- Reference: `process.env.API_KEY` or `import.meta.env.VITE_API_KEY` (Vite)

### 2. **What NOT to Commit**
❌ API keys and secrets  
❌ Database credentials  
❌ OAuth tokens and refresh tokens  
❌ Email addresses and passwords  
❌ Private SSH keys  
❌ Sensitive configuration files  

### 3. **Already Added to .gitignore**
- `.env*` files (all variations)
- `secrets.json`
- `*.key`, `*.pem` (encryption keys)
- `credentials.*` files
- Database files (`*.db`, `*.sqlite`)

### 4. **Setup Instructions for Collaborators**
1. Clone the repository
2. Copy `.env.example` to `.env`: `cp .env.example .env`
3. Fill in actual values in `.env` (only on their machine)
4. Never commit the `.env` file

### 5. **If You Accidentally Committed Secrets**

**Immediate action required:**
```bash
# Remove from Git history
git rm --cached .env
git commit --amend --no-edit
git push --force-with-lease origin main

# Rotate any exposed secrets (change API keys, passwords, tokens)
```

**Then use tools like:**
- `git-secrets` - Prevents secrets in commits
- `pre-commit` - Hooks to catch sensitive data before commit

### 6. **Platform-Specific Secrets**

**GitHub Secrets (for CI/CD):**
- Settings → Secrets and variables → Actions
- Reference: `${{ secrets.API_KEY }}`

**Vercel Secrets (if deployed):**
- Project Settings → Environment Variables
- Mark as "Sensitive" if needed

### 7. **Code Review Checklist**
Before pushing code:
- ✓ No hardcoded API keys
- ✓ No database passwords in code
- ✓ No email addresses exposed
- ✓ No OAuth tokens visible
- ✓ `.env` file is in `.gitignore`

### 8. **Tools to Detect Secrets**
- `git-secrets`: `brew install git-secrets`
- `pre-commit`: `pip install pre-commit`
- GitHub's secret scanning: Automatic for public repos

## Testing Environment Variables Locally

```javascript
// Check if variable is loaded (JavaScript/Node)
console.log(process.env.VITE_API_KEY); // Should work
```

## References
- [GitHub: Managing secrets](https://docs.github.com/en/codespaces/managing-your-codespaces/managing-secrets-for-your-codespaces)
- [12 Factor App: Config](https://12factor.net/config)
- [OWASP: Secrets Management](https://owasp.org/www-community/Secrets_Management)
