@echo off
echo Adding files to Git...
git add .

echo Committing changes...
git commit -m "Restructure website: Keep flyer in hero section, add navigation, move details to separate section"

echo Pushing to GitHub...
git push origin website-2025

echo Done!
