import os
import segno

# Get the repository name from the environment variable
repo_name = os.getenv('REPO_NAME')
# This gives 'username/repo'
if repo_name:
    repo_name = repo_name.split('/')[-1]  # Extracts 'repo'
else:
    # Default
    rep_name = "MD_Book_Template"

#define web address
web_address = f"https://uniofgreenwich.github.io/{repo_name}"

# Generate the QR code
qr = segno.make(web_address)

# Save the QR code as an image
qr.save("content/Introduction/mdbook-qr-code.png",scale=10)

print("QR code generated and saved successfully.")