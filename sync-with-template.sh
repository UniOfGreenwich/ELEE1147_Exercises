#!/usr/bin/env bash

# Variables for template repository details
SOURCE_REPO_URL="https://github.com/uniofgreenwich/MD_Book_Template.git"
SOURCE_BRANCH="main"
OLDVERSION=$(grep -w Version < README.md | cut -f 4 -d ' ')
NEWVERSION=''

# Paths
BOOK_TOML="book.toml"
BOOK_TOML_TMP="book.toml.tmp"

# Extract preserved values from the current book.toml
echo "Extracting preserved values from $BOOK_TOML..."
TITLE_VALUE=$(grep '^title = ' "$BOOK_TOML")
REPO_URL_VALUE=$(grep '^git-repository-url = ' "$BOOK_TOML")
EDIT_URL_VALUE=$(grep '^edit-url-template = ' "$BOOK_TOML")

# setup-config.sh
echo "Setting up the .git/config file with template repository..."

# Add 'template' remote if it doesn't exist
if ! git remote get-url template &>/dev/null; then
  echo "Adding 'template' remote to .git/config..."
  git remote add template "$SOURCE_REPO_URL"
  git config remote.template.fetch "+refs/heads/*:refs/remotes/template/*"
fi

# Fetch the latest changes from the template repository
echo "Fetching the latest changes from the template repository..."
git fetch template "$SOURCE_BRANCH"

# Create a temporary branch to avoid directly merging into the current branch
echo "Creating a temporary branch for selective merge..."
git checkout -b template-merge template/"$SOURCE_BRANCH"

# Reset HEAD to the original branch to begin selective merge
echo "Preparing for selective merge..."
git checkout -

# List of files and directories to merge
INCLUDE_FILES=(
  ".github/*"
  ".gitignore"
  "README.md"
  "sync-with-template.sh"
  "theme/*"
  "book.toml"
)

# Merge or copy only specified files/directories from the template branch
for file in "${INCLUDE_FILES[@]}"; do
  echo "Processing $file..."
  if git diff --name-only template-merge -- "$file" &>/dev/null; then
    git checkout template-merge -- "$file"
  else
    echo "No changes for $file, skipping."
  fi
done

# Replace extracted values in the updated book.toml
if [[ -f "$BOOK_TOML" ]]; then
  echo "Restoring preserved values in $BOOK_TOML..."

  # Use sed to find the matching keys and replace their values
  sed -E -e "s|^title = .*|${TITLE_VALUE}|" \
         -e "s|^git-repository-url = .*|${REPO_URL_VALUE}|" \
         -e "s|^edit-url-template = .*|${EDIT_URL_VALUE}|" "$BOOK_TOML" > "$BOOK_TOML_TMP"

  # Replace original book.toml with the modified one
  mv "$BOOK_TOML_TMP" "$BOOK_TOML"
fi

# Clean up the temporary branch
echo "Cleaning up temporary branch..."
git branch -D template-merge

# Stage and commit the merged changes
echo "Committing the merged changes..."
git add "${INCLUDE_FILES[@]}"

# Grab the commit message from template Version: [0-9].[0-9].[0-9]
NEWVERSION=$(grep -w Version < README.md | cut -f 4 -d ' ')

# Message format works for upgrade and rollback
git commit -m "template: from Version ${OLDVERSION:-0.0.0} to ${NEWVERSION}"
echo "Changes committed."

echo -e "Operation complete.\n"
