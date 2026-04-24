#!/usr/bin/env bash
# deploy.sh — 一鍵 commit & push，觸發 Netlify CI/CD
# 用法：./deploy.sh "你的 commit message"

set -euo pipefail

if [ -z "${1:-}" ]; then
  echo "❌  請提供 commit message。"
  echo "   用法：./deploy.sh \"update: 新增 VAP 專案說明\""
  exit 1
fi

echo "📦  Staging all changes..."
git add .

if git diff --cached --quiet; then
  echo "⚠️   無新變更，直接 push..."
else
  echo "✍️   Committing: $1"
  git commit -m "$1"
fi

echo "🚀  Pushing to origin..."
git push

echo "✅  Done! Netlify will pick up the changes automatically."
