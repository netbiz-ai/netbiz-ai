export type ContentPiece = {
  id: string;
  source_type: "youtube" | "text";
  source_input: string;
  source_transcript: string | null;
  title: string | null;
  blog_draft: string;
  linkedin_draft: string;
  twitter_draft: string[];
  published_post_id: string | null;
  created_at: string;
  updated_at: string;
  posts?: { slug: string } | null;
};
