# Photo Update Guide

## Where to Place Your Photos

Place all your photos in the `public/assets/` folder:

```
public/
  assets/
    profile1.jpg              <- Your main profile photo
    profile2.jpg              <- Your second profile photo
    projects/
      project-xeno.jpg        <- Xeno Mini screenshot
      project-landing.jpg     <- Landing Page screenshot
      project-movie.jpg       <- Movie App screenshot
      project-ecommerce.jpg   <- E-Commerce screenshot
```

## Step-by-Step Instructions

### 1. Prepare Your Images

| Photo | Recommended Size | Format |
|-------|-----------------|--------|
| Profile Photo 1 | 400x400px (square) | JPG or PNG |
| Profile Photo 2 | 400x400px (square) | JPG or PNG |
| Project Screenshots | 800x450px (16:9) | JPG or PNG |

### 2. Rename Your Files

Rename your photos to match the expected file names:
- `profile1.jpg` - Main hero profile photo
- `profile2.jpg` - Second hero profile photo
- `project-xeno.jpg` - Xeno Mini project screenshot
- `project-landing.jpg` - Landing Page screenshot
- `project-movie.jpg` - Movie App screenshot
- `project-ecommerce.jpg` - E-Commerce screenshot

### 3. Replace the Files

Copy your renamed photos into the correct folders:
```bash
# Copy profile photos
cp your-photo1.jpg public/assets/profile1.jpg
cp your-photo2.jpg public/assets/profile2.jpg

# Copy project screenshots
cp xeno-screenshot.jpg public/assets/projects/project-xeno.jpg
cp landing-screenshot.jpg public/assets/projects/project-landing.jpg
cp movie-screenshot.jpg public/assets/projects/project-movie.jpg
cp ecommerce-screenshot.jpg public/assets/projects/project-ecommerce.jpg
```

### 4. Rebuild and Deploy

After placing your photos, run:
```bash
npm run build
```

The `dist/` folder will contain your updated portfolio with your photos.

## Alternative: Share a Link

If you can't upload files directly, you can:
1. Upload your photos to Google Drive / Dropbox / Any file host
2. Get the direct download links
3. Share the links here and I'll update them for you

## Current Placeholder Images

The portfolio currently uses AI-generated placeholder images. Replace them with your own photos for a personal touch!
