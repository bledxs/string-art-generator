# Giscus Setup Guide

## What is Giscus?

Giscus is a comments system powered by GitHub Discussions. It's free,
open-source, and requires no database. Users sign in with GitHub to leave
comments.

## Setup Steps

### 1. Enable GitHub Discussions

1. Go to your repository: https://github.com/bledxs/string-art-generator
2. Click on **Settings** tab
3. Scroll down to **Features** section
4. Check the box **✓ Discussions**
5. Click **Set up discussions**

### 2. Create "Blog Comments" Category

1. Go to **Discussions** tab in your repository
2. Click **Categories** (pencil icon)
3. Click **New category**
4. Fill in:
   - **Category name**: `Blog Comments`
   - **Description**: `Comments on blog posts from String Art Generator`
   - **Discussion Format**: Choose `Announcement` (recommended for blog
     comments)
5. Click **Create**

### 3. Get Giscus Configuration IDs

1. Visit https://giscus.app/
2. Fill in the configuration:
   - **Repository**: `bledxs/string-art-generator`
   - **Page ↔️ Discussions Mapping**: Choose `pathname`
   - **Discussion Category**: Choose `Blog Comments` (the category you just
     created)
   - **Features**:
     - ✓ Enable reactions
     - Choose your preferred theme: `preferred_color_scheme` (auto light/dark)
3. Copy the generated `data-repo-id` and `data-category-id`

### 4. Update Component

Edit `src/features/blog/components/Comments.tsx`:

```tsx
// Replace these lines with your actual IDs:
script.setAttribute('data-repo-id', 'YOUR_REPO_ID_HERE');
script.setAttribute('data-category-id', 'YOUR_CATEGORY_ID_HERE');
```

**Example IDs** (you need to get your own):

- `data-repo-id`: `R_kgDONQZReg`
- `data-category-id`: `DIC_kwDONQZRes4CkvOr`

### 5. Test Comments

1. Build and deploy your app: `pnpm build && pnpm start`
2. Navigate to any blog post: http://localhost:3000/blog/history-of-string-art
3. Scroll to the bottom - you should see the Giscus widget
4. Sign in with GitHub and leave a test comment

### 6. Optional: Moderate Comments

- All comments appear in GitHub Discussions under "Blog Comments" category
- You can moderate, edit, or delete comments directly in GitHub
- Lock discussions to prevent new comments if needed

## Troubleshooting

**Widget not showing?**

- Check browser console for errors
- Verify repository is public
- Ensure Discussions are enabled
- Double-check `data-repo-id` and `data-category-id`

**Comments not persisting?**

- Ensure you're signed in with GitHub
- Check if repository has Discussions enabled
- Verify the category exists

**Theme not matching?**

- Change `data-theme` to `light`, `dark`, or `preferred_color_scheme`
- For custom themes:
  https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md

## Benefits

✅ **Free** - No database, no server costs  
✅ **Privacy-friendly** - No tracking, GitHub authentication only  
✅ **Spam protection** - GitHub's spam detection  
✅ **Moderation** - Built-in GitHub moderation tools  
✅ **Reactions** - Upvotes, emoji reactions  
✅ **Markdown support** - Rich formatting, code blocks  
✅ **No dependencies** - Pure client-side script

## Resources

- Giscus website: https://giscus.app/
- GitHub repo: https://github.com/giscus/giscus
- Advanced usage: https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md
