import os
import segno

# Get the repository name from the environment variable
repo_name = os.getenv('REPO_NAME')

# Define the web address
web_address = f"https://uniofgreenwich.github.io/{repo_name}"

# Generate the QR code
qr = segno.make(web_address)

# Save the QR code as an image
qr.save("content/Introduction/mdbook-qr-code.png",scale=10)

print("QR code generated and saved successfully.")