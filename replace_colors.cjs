const fs = require('fs');
const path = require('path');

const replacements = {
  'bg-[#080808]': 'bg-[#f8f5f2] dark:bg-[#080808]',
  'bg-[#0a0a0a]': 'bg-white dark:bg-[#0a0a0a]',
  'bg-[#0f0f0f]': 'bg-[#faf8f5] dark:bg-[#0f0f0f]',
  'bg-[#141414]': 'bg-[#f4f0ea] dark:bg-[#141414]',
  'bg-[#181818]': 'bg-[#efebe4] dark:bg-[#181818]',
  'text-stone-100': 'text-stone-900 dark:text-stone-100',
  'text-stone-200': 'text-stone-800 dark:text-stone-200',
  'text-stone-300': 'text-stone-700 dark:text-stone-300',
  'text-stone-400': 'text-stone-600 dark:text-stone-400',
  'text-stone-600': 'text-stone-400 dark:text-stone-600',
  'border-white/5': 'border-stone-200 dark:border-white/5',
  'border-white/10': 'border-stone-300 dark:border-white/10',
  'bg-black/80': 'bg-white/90 dark:bg-black/80',
  'from-black': 'from-stone-200 dark:from-black',
  'bg-amber-600/20': 'bg-amber-100 dark:bg-amber-600/20',
  'bg-amber-600/30': 'bg-amber-200 dark:bg-amber-600/30',
  'border-amber-500/30': 'border-amber-300 dark:border-amber-500/30',
  'border-amber-500/40': 'border-amber-400 dark:border-amber-500/40',
  'text-amber-200': 'text-amber-800 dark:text-amber-200',
  'text-amber-300': 'text-amber-700 dark:text-amber-300',
  'bg-stone-800/10': 'bg-stone-300/30 dark:bg-stone-800/10',
  'mix-blend-multiply': 'mix-blend-multiply dark:mix-blend-multiply'
};

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;
      
      for (const [key, value] of Object.entries(replacements)) {
        // Simple string replace for now. We use regex with word boundary equivalent for Tailwind classes.
        // Actually since they can be prefixed or suffixed, we should be careful.
        // Let's use negative lookahead/lookbehind to ensure we aren't replacing already dark: prefixed things.
        const escapedKey = key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(`(?<!dark:)${escapedKey}`, 'g');
        content = content.replace(regex, value);
      }
      
      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory('./src');
console.log('Done');
