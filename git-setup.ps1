# Set the current directory
Set-Location -Path "C:/Users/LENOVO/Documents/augment-projects/QEGEconomicEmpowerment"

# Initialize Git repository
git init

# Configure Git user (if not already configured)
# git config --global user.email "your-email@example.com"
# git config --global user.name "Your Name"

# Add all files to the repository
git add .

# Commit the changes
git commit -m "Initial commit: Queen Esthers' Generation 2025 Economic Empowerment Breakfast Meeting website"

# Add the remote repository
git remote add origin https://github.com/peteroluoch/QEGBreakfast2025.git

# Push to the remote repository
git push -u origin main

# Output status
Write-Host "Git setup complete. Check the output for any errors."
