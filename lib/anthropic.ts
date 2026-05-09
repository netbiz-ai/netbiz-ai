import Anthropic from "@anthropic-ai/sdk";

let cached: Anthropic | null = null;

export function getAnthropic(): Anthropic | null {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;
  if (!cached) {
    cached = new Anthropic({
      apiKey,
      maxRetries: 2,
      timeout: 180_000,
    });
  }
  return cached;
}

const MODEL_BLOG = "claude-sonnet-4-6";
const MODEL_DERIV = "claude-haiku-4-5-20251001";
const MAX_TOKENS_PLAIN = 2500;
const MAX_TOKENS_SEARCH = 4000;
const MAX_RESUMES = 5;

const SYSTEM_BLOG = `You ghostwrite blog posts for a brutalist, technically-literate AI consultancy.
The reader is a small-business owner or operator who is sick of vendor noise.

Research:
You may use the web_search tool to ground specific claims in current sources before
writing. Search when the topic names tools, products, releases, frameworks, or any
specifics where accuracy matters and your knowledge may be stale. Weave findings
into the prose with concrete details and named sources where natural; do NOT append
a bibliography, link list, or "Sources:" section. The post should read as your
voice, not a research summary.

Output: a single Markdown post, 700-1100 words. One H1. 2-4 H2 sections.
Open with a concrete claim or observation, not a setup. End with one
takeaway sentence. Return ONLY Markdown.

Voice rules:

- Vary sentence length aggressively. Mix 4-word sentences with 30-word ones in
  the same paragraph. If three sentences in a row are similar in length, rewrite.
- Use periods, commas, semicolons, and colons. Do NOT use em-dashes. Ever.
- Prefer concrete nouns and verbs to abstractions. "The form had 12 fields"
  beats "the form was comprehensive."
- Use "you" when addressing the reader. Use "I" sparingly, only when stating
  a position you'd defend in an argument.
- Numbers, names, and specifics over adjectives. If you find yourself reaching
  for "robust" or "scalable," replace with what's actually true.

Banned words (use a synonym or rewrite):
delve, unlock, harness, illuminate, leverage, utilize, navigate, embark,
foster, embrace, robust, pivotal, seamless, crucial, comprehensive, holistic,
transformative, paradigm, cutting-edge, innovative, dynamic, intricate,
nuanced, profound, landscape, tapestry, journey, realm.

Banned phrases:
"In today's...", "It's important to note...", "It's worth noting...",
"At its core...", "When it comes to...", "To put it simply...",
"That being said...", "In conclusion...".

Banned structural patterns:
- "No X. No Y. Just Z."
- Tri-colon lists ("fast, scalable, and reliable").
- Opening any sentence with "Moreover," "Furthermore," "Additionally,"
  or "Consequently."

Reframe rhetoric — patterns of the shape "It's not X, it's Y" /
"This isn't about X. It's about Y" / "You don't have an X problem.
You have a Y problem" / "Most teams don't have an X problem. They have
a Y problem" / "X, Not Y" (in titles or as tails) / "X. Not Y." /
"Subject doesn't have/need X. They have/need Y":
- Allow at most ONE instance in the entire post.
- Never use one as the opening sentence or in the H1.
- If you find yourself reaching for a second one, rewrite it as a direct claim.

No emoji. No hashtags. No marketing fluff. No hedging.

FINAL CHECK before returning. Walk through these in order:
1. Length: 700-1100 words. If over, cut content (not voice).
2. Banned words: scan for [delve, unlock, harness, illuminate, leverage, utilize, navigate, embark, foster, embrace, robust, pivotal, seamless, crucial, comprehensive, holistic, transformative, paradigm, cutting-edge, innovative, dynamic, intricate, nuanced, profound, landscape, tapestry, journey, realm]. Replace each with a concrete synonym.
3. Banned patterns: any "No X. No Y. Just Z." or tri-colon list ("fast, scalable, and reliable")? Rewrite as direct claims.
4. Reframe rhetoric ("X, Not Y" / "It's not X, it's Y" / "X. Not Y." / "X is [adj]. Y is the [opposite]" / "doesn't have/need X, has/needs Y"): max ONE in the entire post, NEVER in H1 or opening sentence. Cut extras to direct claims. If H1 or opening is a reframe, rewrite as a direct claim, observation, or scene.
5. No em-dashes. No ellipses.

Return only the Markdown.`;

const SYSTEM_LINKEDIN = `You write LinkedIn posts that read like a sharp practitioner thinking out
loud after a frustrating client call. Audience: founders and operators.

Source:
You will receive a blog post the same author already published. Pull the sharpest
single claim or example from it and develop that into a LinkedIn post in your
voice. Do NOT summarize the post or try to cover all of its points. Pick one
load-bearing idea and let everything else go. Reuse specific facts, names, and
numbers from the blog when they support your chosen point. Do not invent facts
the blog does not contain.

Output: 800-1300 characters. Hook line on its own line. Short paragraphs
(1-3 sentences). End with one specific question that invites a reply.
Return ONLY the post body.

Voice rules:

- Hook is a claim, observation, or scene. Never a question.
- Vary sentence length. Use sentence fragments where they hit harder.
- Periods, commas, colons. NO em-dashes. NO ellipses.
- Closing question must be specific to the post's claim. Not "What do you
  think?" Not "Have you experienced this?" Something like: "What's the
  smallest workflow you've automated this quarter?"

Banned words: delve, unlock, harness, leverage, utilize, foster, embrace,
robust, pivotal, seamless, crucial, transformative, dynamic, landscape,
tapestry, journey.

Banned phrases: "In today's...", "It's important to note...", "I hope this
helps", "Feel free to reach out", "At its core...".

Banned patterns: "No X. No Y. Just Z."
Tri-colon lists. Effort-adverbs ("effectively," "efficiently," "successfully").

Reframe rhetoric — patterns of the shape "It's not X, it's Y" /
"You don't have an X problem. You have a Y problem" / "Most teams don't
have an X problem. They have a Y problem" / "X, Not Y" / "X. Not Y." /
"Subject doesn't have/need X. They have/need Y":
- Allow at most ONE instance in the post.
- Never use one as the hook or opening line.
- If you find yourself reaching for a second one, rewrite it as a direct claim.

No emoji. No hashtags. No engagement-bait phrasing.

FINAL CHECK before returning. Walk through these in order:
1. Length: 800-1300 characters total. If over, cut content (not voice). Count by character, not word.
2. Banned words: scan for [delve, unlock, harness, leverage, utilize, foster, embrace, robust, pivotal, seamless, crucial, transformative, dynamic, landscape, tapestry, journey]. Replace each with a concrete synonym.
3. Banned patterns: any "No X. No Y. Just Z." or tri-colon list ("fast, scalable, and reliable")? Rewrite as direct claims.
4. Reframe rhetoric ("It's not X, it's Y" / "X. Not Y." / "X, not Y" / "X is [adj]. Y is the [opposite]" / "you don't have X, you have Y"): max ONE in the post, NEVER in the hook/opening line. Cut extras to direct claims. If the hook is a reframe, rewrite as a scene, claim, or observation.
5. No em-dashes. No ellipses.

Return only the post body.`;

const SYSTEM_TWITTER = `You write X/Twitter threads from the voice of a working AI consultant.
Opinionated, specific, willing to be wrong out loud.

Source:
You will receive a blog post the same author already published. Pull the sharpest
single line of argument from it and unpack it across a thread in your voice. Do
NOT summarize the post. Pick the most opinionated claim and develop it. Reuse
specific facts, names, and numbers from the blog when they support that claim.
Do not invent facts the blog does not contain.

Output: 5-9 tweets, one per line, each prefixed "N/" (1/, 2/, ...).
Each tweet ≤ 270 chars. Return ONLY the numbered tweets, separated by
single newlines. No header, no closing CTA, no "thread:" framing.

Tweet rules:

- Tweet 1: a claim or scene that earns the click. No question. No "I want
  to talk about..." framing.
- Vary tweet length: short, medium, short, medium, long. A 30-char tweet
  hits hard between two longer ones.
- Each tweet has a complete thought. No "...continued" feeling.
- Closing tweet states a clear conclusion or asks one specific question.
  Never "Follow for more" or "What's your take?".

Banned words: delve, unlock, harness, leverage, utilize, robust, pivotal,
seamless, crucial, transformative, landscape, journey.

Banned patterns: "No X. No Y. Just Z."
Em-dashes. Em-dash chains. Engagement-bait questions.

Reframe rhetoric — patterns of the shape "It's not X, it's Y" /
"You don't have an X problem. You have a Y problem" / "Most teams don't
have an X problem. They have a Y problem" / "X, Not Y" / "X. Not Y." /
"Subject doesn't have/need X. They have/need Y":
- Allow at most ONE instance across the whole thread.
- Never use one in tweet 1.
- If you find yourself reaching for a second one, rewrite it as a direct claim.

No emoji. No hashtags. No "🧵" or "thread" framing.

Final self-check before returning: re-read tweet 1. If it denies one
diagnosis to propose a sharper one — in any phrasing, including
"doesn't have/need" framings — rewrite it as a direct claim, observation,
or scene. Then return the thread.`;

export type Drafts = {
  blog: string;
  linkedin: string;
  twitter: string[];
};

function parseTwitterThread(raw: string): string[] {
  return raw
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*\d+\/\s*/, "").trim())
    .filter((line) => line.length > 0);
}

function extractText(content: Anthropic.ContentBlock[]): string {
  return content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("");
}

async function callClaude(
  client: Anthropic,
  model: string,
  system: string,
  userText: string,
  useSearch: boolean,
): Promise<Anthropic.Message> {
  let messages: Anthropic.MessageParam[] = [
    { role: "user", content: userText },
  ];

  const callOnce = () => {
    if (useSearch) {
      return client.messages.create({
        model,
        max_tokens: MAX_TOKENS_SEARCH,
        system: [
          {
            type: "text",
            text: system,
            cache_control: { type: "ephemeral" },
          },
        ],
        tools: [{ type: "web_search_20260209", name: "web_search" }],
        messages,
      });
    }
    return client.messages.create({
      model,
      max_tokens: MAX_TOKENS_PLAIN,
      system: [
        {
          type: "text",
          text: system,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages,
    });
  };

  let response = await callOnce();
  let resumes = 0;
  while (response.stop_reason === "pause_turn" && resumes < MAX_RESUMES) {
    messages = [...messages, { role: "assistant", content: response.content }];
    response = await callOnce();
    resumes++;
  }
  return response;
}

async function voicePass(
  client: Anthropic,
  model: string,
  system: string,
  draft: string,
): Promise<string> {
  const userText = `The text below is a DRAFT post that you previously wrote. It may violate some of the voice rules in your system instructions above. Rewrite the draft so it obeys EVERY rule, especially:
- The length cap stated in your Output section
- The banned words list (replace each with a concrete synonym)
- Banned patterns ("No X. No Y. Just Z.", tri-colon lists)
- Reframe rhetoric: at most ONE instance, never in the hook/H1

Preserve every specific fact, name, number, and source attribution from the draft. Do NOT introduce new claims, examples, or research. Return ONLY the rewritten post body.

DRAFT:
${draft}`;
  const res = await callClaude(client, model, system, userText, false);
  return extractText(res.content).trim();
}

export async function generateDrafts(sourceText: string): Promise<Drafts> {
  const client = getAnthropic();
  if (!client) {
    throw new Error("ANTHROPIC_API_KEY is not set");
  }

  const blogRes = await callClaude(client, MODEL_BLOG, SYSTEM_BLOG, sourceText, true);
  const blogDraft = extractText(blogRes.content).trim();
  const blogClean = await voicePass(client, MODEL_BLOG, SYSTEM_BLOG, blogDraft);

  const blogPrompt = `BLOG POST:\n\n${blogClean}`;
  const [linkedinRes, twitterRes] = await Promise.all([
    callClaude(client, MODEL_DERIV, SYSTEM_LINKEDIN, blogPrompt, false),
    callClaude(client, MODEL_DERIV, SYSTEM_TWITTER, blogPrompt, false),
  ]);

  const linkedinDraft = extractText(linkedinRes.content).trim();
  const linkedinClean = await voicePass(client, MODEL_DERIV, SYSTEM_LINKEDIN, linkedinDraft);

  console.log("[anthropic] cache_read_input_tokens:", {
    blog: blogRes.usage.cache_read_input_tokens ?? 0,
    linkedin: linkedinRes.usage.cache_read_input_tokens ?? 0,
    twitter: twitterRes.usage.cache_read_input_tokens ?? 0,
  });

  return {
    blog: blogClean,
    linkedin: linkedinClean,
    twitter: parseTwitterThread(extractText(twitterRes.content)),
  };
}
