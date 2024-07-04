#!/bin/bash

# Define submodules
submodules=("user" "task" "token" "permission" "mailer" "gateway")

# Loop through each submodule
for submodule in "${submodules[@]}"; do
  echo "Cleaning $submodule..."

  # Navigate to submodule directory
  cd $submodule

  # Remove dist and node_modules directories if they exist
  [[ -d "dist" ]] && rm -rf dist
  [[ -d "node_modules" ]] && rm -rf node_modules

  # Navigate back to the root directory
  cd ..

  echo "$submodule cleaned."
done

echo "Cleaning completed."