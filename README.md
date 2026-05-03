# Convergint Bid Qualification Tool
## Deploy to Vercel — Step by Step

---

### What you need before starting
- A free Vercel account → sign up at **vercel.com**
- Your Anthropic API key → get one at **console.anthropic.com**

---

### Step 1 — Upload the project to GitHub

1. Go to **github.com** and sign in (create a free account if needed)
2. Click the **+** icon (top right) → **New repository**
3. Name it `convergint-bid-tool`, leave everything else as default, click **Create repository**
4. On the next page, click **uploading an existing file**
5. Drag and drop ALL the files and folders from this zip into the upload area
6. Click **Commit changes**

---

### Step 2 — Deploy to Vercel

1. Go to **vercel.com** and sign in
2. Click **Add New** → **Project**
3. Click **Import** next to your `convergint-bid-tool` repository
4. Leave all settings as default — Vercel will detect it automatically
5. Click **Deploy**

---

### Step 3 — Add your Anthropic API key

This is the most important step — without it the tool won't work.

1. In Vercel, go to your project → **Settings** → **Environment Variables**
2. Click **Add New**
3. Set:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** your API key (starts with `sk-ant-...`)
4. Click **Save**
5. Go back to **Deployments** and click **Redeploy** (so the key takes effect)

---

### Step 4 — Share with your team

Vercel gives you a URL like:
`https://convergint-bid-tool.vercel.app`

Share that link — anyone with it can use the tool immediately, no login required.

---

### Updating questions later

To edit the questions, open `src/App.js` in GitHub and find the `QUESTIONS` array near the top of the file. You can edit directly in GitHub's browser editor. Every time you save a change, Vercel automatically redeploys within about 30 seconds.

---

### Costs

- Vercel hosting: **free** (Hobby tier is plenty for internal use)
- Anthropic API: approximately **$0.01–0.03 per evaluation** depending on length
