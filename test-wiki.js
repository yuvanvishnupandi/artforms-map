import { traditions } from './src/data.js';

async function testWiki() {
  for (const t of traditions) {
    try {
      const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(t.name)}`);
      if (!res.ok) {
        console.log(`❌ Failed: ${t.name} (Status: ${res.status})`);
      } else {
        const data = await res.json();
        console.log(`✅ Success: ${t.name} -> Returns image? ${!!data.thumbnail || !!data.original} -> Title: ${data.title}`);
      }
    } catch (e) {
      console.log(`❌ Error: ${t.name} - ${e.message}`);
    }
  }
}

testWiki();
