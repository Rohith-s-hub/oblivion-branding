export const project = {
  name: 'Oblivion Agent',
  version: '3.4.3',
  released: 'September 13, 2026',
  python: '3.11+',
  tools: 38,
  backends: 13,
  domains: 14,
  advancedPacks: 2,
  mcpModes: ['Safe', 'Standard', 'Full'],
  links: {
    pypi: 'https://pypi.org/project/oblivion-agent/',
    github: 'https://github.com/Rohith-s-hub/Oblivion-agent',
    blog: 'https://rohith.run.place/blog/oblivion-local-ai-coding-agent',
    linkedin: 'https://www.linkedin.com/in/rohith-rajkumar-040676315/',
    issues: 'https://github.com/Rohith-s-hub/Oblivion-agent/issues',
    releases: 'https://github.com/Rohith-s-hub/Oblivion-agent/releases',
  },
};

export const navLinks = [
  ['Product', '/product'], ['Features', '/features'], ['How it works', '/how-it-works'],
  ['Tools', '/tools'], ['Models', '/models'], ['M.E.E.R.A.', '/voice'],
] as const;

export const pages = [
  ['Overview', '/product', 'The agent, its principles, and what makes it useful.'],
  ['Features', '/features', 'The capabilities that make up an Oblivion workflow.'],
  ['How it works', '/how-it-works', 'The ReAct loop, step by step.'],
  ['Tools', '/tools', 'The complete 38-tool catalog with safety tiers.'],
  ['Models', '/models', 'Model providers, fallback behavior, and local options.'],
  ['Knowledge packs', '/knowledge-packs', 'Fourteen domains and advanced companion packs.'],
  ['Architecture', '/architecture', 'Search, memory, planning, and the runtime.'],
  ['M.E.E.R.A. voice', '/voice', 'Speech input, wake words, personas, and output.'],
  ['MCP integrations', '/integrations', 'Connect Oblivion to MCP-compatible tools.'],
  ['Use cases', '/use-cases', 'Examples across coding, research, git, and system tasks.'],
  ['Get started', '/get-started', 'Install, configure, and run Oblivion.'],
  ['Configuration', '/configuration', 'Config file, environment variables, and settings.'],
  ['Compare', '/compare', 'Where Oblivion fits beside other coding tools.'],
  ['Roadmap', '/roadmap', 'What the project is exploring next.'],
  ['Tech stack', '/tech-stack', 'The components and libraries under the hood.'],
  ['Changelog', '/changelog', 'Project milestones and published releases.'],
  ['FAQ', '/faq', 'Answers to common setup, privacy, and usage questions.'],
  ['About', '/about', 'Creator, project values, and ways to contribute.'],
] as const;

export const features = [
  { title: 'An agent that acts', text: 'A ReAct loop plans work, calls tools, observes results, and keeps going until it can give a useful answer.', href: '/how-it-works', tag: 'REASONING' },
  { title: 'Codebase-aware search', text: 'Exact symbol lookup, full-text matching, and vector search combine to find relevant code.', href: '/architecture', tag: 'SEARCH' },
  { title: '38 built-in tools', text: 'Work with files, code, tests, git, web research, packages, and background servers.', href: '/tools', tag: 'TOOLING' },
  { title: 'Choices across models', text: 'Route work through 13 supported model backends, including local and free-tier options.', href: '/models', tag: 'MODEL ROUTING' },
  { title: 'Research from the terminal', text: 'Search the web, fetch page text, look up packages, and browse Stack Overflow without leaving the conversation.', href: '/tools', tag: 'WEB RESEARCH' },
  { title: 'Safety you can inspect', text: 'Read actions run directly. Changes show diffs for approval. High-risk shell commands always ask.', href: '/tools#safety', tag: 'PERMISSIONS' },
  { title: 'Voice when it helps', text: 'Speak to M.E.E.R.A. with local Whisper transcription and Edge TTS, with optional ElevenLabs voices.', href: '/voice', tag: 'VOICE' },
  { title: 'Memory between sessions', text: 'Project conventions and lessons can be saved in a workspace MEMORY.md file.', href: '/architecture#memory', tag: 'MEMORY' },
  { title: 'Works with your other tools', text: 'Offer code intelligence to MCP clients such as Claude Desktop, Cursor, and Zed.', href: '/integrations', tag: 'MCP' },
  { title: 'A real terminal interface', text: 'Textual provides the interactive UI, status, tool activity, command palette, and session history.', href: '/tech-stack', tag: 'TEXTUAL TUI' },
  { title: 'A little 8085', text: 'An Intel 8085 simulator and assembler live inside the agent as a working educational extra.', href: '/features#simulator', tag: 'BONUS' },
];

export const useCases = [
  { name: 'Navigate a codebase', prompt: 'Where is authentication handled, and what calls it?', result: 'Search symbols, inspect callers, read relevant files, and explain the path with file references.' },
  { name: 'Make a focused change', prompt: 'Add error handling to the parser and update the related tests.', result: 'Plan the edit, show a unified diff, apply approved changes, then run the focused test file.' },
  { name: 'Understand a failure', prompt: 'Run the tests and explain the first failure.', result: 'Detect the test framework, execute tests, and turn the result into a concrete next step.' },
  { name: 'Research without tab hopping', prompt: 'Find the current docs for this package and compare the API.', result: 'Search the web, fetch source pages, and look up package metadata from the terminal.' },
  { name: 'Handle everyday git work', prompt: 'Show my changes and prepare a commit for the parser fix.', result: 'Inspect status and diffs, then make a commit when you approve the mutation.' },
  { name: 'Ask about the machine', prompt: 'How much memory is free, and is the dev server running?', result: 'Use system and server tools to report the current workspace environment.' },
];

export const packs = [
  'React', 'Next.js', 'Vue', 'Tailwind', 'TypeScript', 'Django', 'FastAPI', 'Docker',
  'Security', 'Testing', 'Database', 'Debugging', 'Deployment', 'Web development',
];
export const advancedPacks = ['Advanced debugging', 'Advanced web development'];

export const providers = [
  { name: 'Ollama Cloud', examples: 'Gemma 4 31B · Qwen3 Coder', mode: 'Cloud', note: 'Free-tier model routes documented by the project.' },
  { name: 'Ollama Local', examples: 'Qwen 3.5 4B · local models', mode: 'Local', note: 'Run a local model with Ollama for an offline-capable workflow.' },
  { name: 'Google Gemini', examples: 'Gemini 2.5 Flash · Gemini 2.5 Pro', mode: 'Cloud', note: 'Configure with GEMINI_API_KEY.' },
  { name: 'Groq', examples: 'GPT-OSS · Llama · DeepSeek', mode: 'Cloud', note: 'Fast hosted model choices; configure with GROQ_API_KEY.' },
  { name: 'OpenRouter', examples: 'Qwen · GPT-OSS · Llama · Nemotron', mode: 'Cloud', note: 'Use an OpenRouter key to access its model catalog.' },
  { name: 'Bring a LiteLLM model', examples: 'Anthropic · OpenAI · DeepSeek · compatible IDs', mode: 'Custom', note: 'Model identifiers follow LiteLLM format; custom model IDs can be added.' },
];

export const milestones = [
  { version: 'v0.1.0', title: 'The first ReAct agent', text: 'Working terminal agent with diff approval and semantic search.' },
  { version: 'v0.5.0', title: 'Read before quoting', text: 'The agent is required to inspect source before quoting code.' },
  { version: 'v1.0.0', title: 'Oblivion gets its identity', text: 'The global command and cyberpunk Textual interface arrive.' },
  { version: 'v1.5–1.7', title: 'Voice becomes part of the workflow', text: 'Whisper input, M.E.E.R.A. voice personality, and optional ElevenLabs output.' },
  { version: 'v2.0–2.5', title: 'Memory and code intelligence', text: 'Persistent project memory, verification, planning, and task decomposition.' },
  { version: 'v2.6–2.10', title: 'From local project to package', text: 'PyPI packaging, setup wizard, sessions, MCP, OpenRouter, and self-updating.' },
  { version: 'v3.0', title: 'Permission tiers and 8085', text: 'Permission-aware actions and the Intel 8085 simulator join the TUI.' },
  { version: 'v3.4.3', title: 'Current published release', text: 'The repository’s current pyproject release version, published September 13, 2026.' },
];

export const faqs = [
  ['Does Oblivion need an internet connection?', 'Cloud model providers and web search need a connection. A local Ollama model with local workspace tools can keep the workflow offline.'],
  ['Does my code leave my machine?', 'That depends on the model you select. Cloud providers receive the prompt and relevant tool output; a local Ollama model can keep inference local.'],
  ['Can I use my own model?', 'Yes. Oblivion routes through LiteLLM-compatible model identifiers and supports adding a custom model.'],
  ['How does it keep file changes safe?', 'Read operations run directly. Mutations use approval and a diff preview by default. High-risk shell patterns stay behind explicit confirmation even in auto mode.'],
  ['Is voice required?', 'No. Voice support is optional and installed separately with the voice extra. Text mode works without microphone dependencies.'],
  ['Which Python version is supported?', 'The package metadata requires Python 3.11 or newer.'],
  ['Can other assistants use Oblivion?', 'Yes. Start the MCP server with `oblivion mcp`; MCP clients can access workspace tools according to the selected server tier.'],
  ['Does it work on Windows?', 'The project documents WSL2 as the recommended Windows route. Native Windows audio support may require extra setup.'],
];
