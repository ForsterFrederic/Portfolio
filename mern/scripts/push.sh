#!/bin/bash

# Check if a commit message was provided
if [ -z "$1" ]; then
    echo "Error: No commit message provided."
    echo "Usage: ./scripts/git-push.sh \"Your commit message\""
    exit 1
fi

# Define the remote and branch
REMOTE="hostinger-vps"
BRANCH=$(git branch --show-current)

# Add all changes, commit, and push
git add . && git commit -m "$1" && git push $REMOTE $BRANCH

# Check if the push was successful
if [ $? -eq 0 ]; then
    echo "Changes pushed to $REMOTE/$BRANCH successfully."
else
    echo "Error: Failed to push changes to $REMOTE/$BRANCH."
fi
