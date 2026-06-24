const rawSkillsData = [
  'Frontend – Html, Css, JavaScript, React.js, Next.js, Redux Toolkit, Tailwind CSS, Material UI, Ant Design'
];

const skillsData = rawSkillsData
  .flatMap((s) => typeof s === 'string' ? s.split(',') : [])
  .map((s) => s.replace(/^.*?[:–-]\s*/, '').trim()) 
  .filter(Boolean);

console.log(skillsData);
