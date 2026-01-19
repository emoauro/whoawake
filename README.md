# Who Awake? ☕

Track timezone availability for distributed teams. Create break rooms, add team members, and instantly see who's awake and when everyone overlaps.

**Live at:** [whoawake.com](https://whoawake.com)

## Features

- 🌍 **Break Rooms** - Create rooms for different teams, families, or groups
- ⏰ **Real-time Status** - See who's available, almost there, or offline
- 📊 **Overlap Visualization** - Find the best meeting windows across timezones
- 🏷️ **Tags** - Organize rooms with custom tags and filters
- 🧭 **Temporary Locations** - Track when someone's traveling
- 💾 **Local Storage** - All data stays in your browser, no signup required

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Vercel (hosting)

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deploy to Vercel

### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 2: GitHub Integration

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel auto-detects Vite and deploys

### Option 3: Drag & Drop

1. Run `npm run build`
2. Go to [vercel.com](https://vercel.com)
3. Drag the `dist` folder to deploy

## Domain Setup

After deploying:

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add `whoawake.com`
4. Update your domain's DNS:
   - Add an A record pointing to `76.76.21.21`
   - Or add a CNAME record pointing to `cname.vercel-dns.com`

## Environment

No environment variables required - the app runs entirely client-side.

## TODO

- [ ] Add OG image (1200x630px) at `/public/og-image.png`
- [ ] Add apple-touch-icon (180x180px) at `/public/apple-touch-icon.png`
- [ ] Set up Buy Me a Coffee account at buymeacoffee.com/whoawake
- [ ] Set up email forwarding for hello@whoawake.com
- [ ] Add Vercel Analytics (optional)
- [ ] Add privacy policy page (optional)

## License

MIT
