-- Cybernews articles table
CREATE TABLE IF NOT EXISTS cybernews_articles (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT,
  url TEXT UNIQUE NOT NULL,
  source TEXT NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  image_url TEXT
);

-- Index for faster queries by date
CREATE INDEX IF NOT EXISTS idx_cybernews_published_at ON cybernews_articles(published_at DESC);
