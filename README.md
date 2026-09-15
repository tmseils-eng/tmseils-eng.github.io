# Tyler Seils — personal website

A personal, research-focused website with a warm cream/forest palette, a larger
photograph, first-person project descriptions, and a little life outside the lab.
Original HTML/CSS/JavaScript; no al-folio files, frameworks, build steps, analytics,
third-party fonts, tracking scripts, or backend services.

## Open the website

Extract the ZIP, open this folder, and double-click `index.html`.
Keep `assets/` beside `index.html`. Do not open the site from inside the ZIP.
No installation or development server is required.

The separately supplied `Tyler_Seils_Website_Revised_Preview.html` embeds the CSS,
JavaScript, and photograph in one file. It is useful for a quick preview. Use the
folder in this ZIP for editing or publishing.

## What is included

- Your supplied photograph, optimized as WebP with a JPEG fallback.
- No generative edits or face retouching; the original 3:4 image is displayed.
- A photo export without the original file's EXIF metadata.
- Responsive desktop/mobile layouts and an accessible mobile menu.
- Light and dark modes, saved locally in the visitor's browser.
- Expandable technical details for NeuralChess and QuantPulse.
- Working email, project, research-group, and professional-profile links.
- Copy-email feedback and keyboard navigation.
- A basic 404 page.

The photograph, text, navigation, projects, and email link are usable without
JavaScript. The theme/menu enhancement, optional résumé links, and clipboard
button use JavaScript. The decorative patch grid is not an MRI image or a research
result. There are no patient images or private research files in this package.

## Edit the copy

Edit `index.html` in a text editor such as VS Code. Content is plain HTML, arranged
in reading order:

1. Intro and photo (`#home`).
2. Current research focus.
3. Research and selected projects (`#work`).
4. Personal interests and BioKind (`#about`).
5. Contact (`#contact`).

Keep research marked as ongoing until you have results you want to publish.
The two project links currently use `neuralchess-clean` and `quantpulse-clean`.
Update these URLs if you rename those repositories. The CIG-Denoising link is
labeled as denoising experiments, not as a public release of the liver project.

Review the first-person copy before publishing. It draws on the interests and
projects you shared. Change any sentence that does not sound like you. The public
contact email is `tmseils@wisc.edu`. No phone number or personal address is included.

## Add a résumé

A résumé PDF is not included. To add one, place a reviewed public copy at
`assets/resume.pdf`, then edit `assets/config.js`:

```js
window.SITE_CONFIG = {
  resumePdf: "assets/resume.pdf"
};
```

This enables the résumé links in the navigation and contact section. Leave the
value empty to hide them. Review any phone number or home address before making
a résumé public. For a no-JavaScript résumé link, add an ordinary `<a>` element
pointing to the PDF in `index.html`.

## Change the photograph

Replace `assets/photo.jpg` and `assets/photo.webp` with equivalent exports of the
new photograph. Both files should contain the same photo. Or remove the `<source>`
line in `<picture>` and keep just the JPEG `<img>`. Update its width, height, and alt
text as appropriate. The current image uses its full 3:4 proportions; the slight
tilt is a CSS frame effect, not an edit to the photograph.

## Colors and design

The `:root` variables at the top of `assets/style.css` define the light palette;
`html[data-theme='dark']` defines the dark palette. The site uses system fonts and
Georgia. No font files are bundled or required. The photo and all other assets are
local, so opening the preview does not load third-party fonts or image services.

## Publication status

This package has been prepared for review, not uploaded to GitHub or published.
The intended personal-site repository is `tmseils-eng.github.io` in the
`tmseils-eng` account. The contents of this folder belong at the repository root,
not inside another folder. GitHub Pages setup is separate from editing these files.

The previous draft's GitHub Pages guidance still accompanies that original package.
Refer to GitHub's Pages documentation for the publishing procedure, and use the
URL shown in your repository's Pages settings to confirm successful deployment.
Update the homepage URL in `404.html` if you publish at a different address.

Also update the September 2026 footer date and remove or change the summer 2027
internship text when they no longer reflect what you want to say publicly.
