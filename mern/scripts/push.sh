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

# Function to set IS_PROD value
set_is_prod() {
    local value=$1
    if grep -q '^IS_PROD=' .env; then
        sed -i "s/^IS_PROD=.*/IS_PROD=$value/" .env
    else
        echo "IS_PROD=$value" >> .env
    fi
}

# Set IS_PROD to TRUE
echo "Setting IS_PROD to TRUE"
set_is_prod "TRUE"

# Add all changes, commit, and push
git add . && git commit -m "$1" && git push $REMOTE $BRANCH

# Check if the push was successful
if [ $? -eq 0 ]; then
    echo "Changes pushed to $REMOTE/$BRANCH successfully."
else
    echo "Error: Failed to push changes to $REMOTE/$BRANCH."
fi

# Set IS_PROD back to FALSE
echo "Setting IS_PROD back to FALSE"
set_is_prod "FALSE"