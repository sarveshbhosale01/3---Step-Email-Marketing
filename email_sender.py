# email_sender.py
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage
import pandas as pd
import time
import re
import requests
import os

# -----------------------------
# CONFIGURE YOUR GMAIL CREDENTIALS
# -----------------------------
FROM_EMAIL = "bhosalesarvesh6@gmail.com"  # Replace with your Gmail
APP_PASSWORD = "gwhmhadtigjcipoc"  # 16-char Gmail App Password

# -----------------------------
# OPENROUTER CONFIGURATION
# -----------------------------
OPENROUTER_API_KEY = "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"
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

# -----------------------------
# INDUSTRY TEMPLATES
# -----------------------------
INDUSTRY_TEMPLATES = {
    "HVAC": {
        "subject": "HVAC Solutions for Your Business",
        "specifics": ["Comfort improvement", "Energy efficiency", "Reliable performance"],
        "closing": "Let's discuss how we can optimize your HVAC setup!"
    },
    "Restaurant": {
        "subject": "Kitchen Ventilation Solutions for {company_name}",
        "specifics": ["Eliminate cooking odors and heat", "Improve kitchen air quality", "Reduce energy costs", "Comply with health regulations"],
        "closing": "Let's discuss how we can enhance your kitchen ventilation!"
    },
    "Office": {
        "subject": "Commercial HVAC Solutions for {company_name}",
        "specifics": ["Zoned temperature control", "Lower electricity bills", "Improved air circulation", "Modern HVAC equipment"],
        "closing": "Ready to optimize your office comfort and efficiency!"
    },
    "Retail": {
        "subject": "Retail Store Comfort Solutions for {company_name}",
        "specifics": ["Perfect shopping temperatures", "Reduced operational costs", "Enhanced customer comfort", "Improved air quality"],
        "closing": "Let's create the ideal environment for your customers!"
    },
    "Warehouse": {
        "subject": "Industrial Climate Control for {company_name}",
        "specifics": ["Temperature and humidity control", "Inventory protection", "Energy cost reduction", "Employee comfort solutions"],
        "closing": "Ready to optimize your warehouse environment!"
    },
    "Medical": {
        "subject": "Healthcare Air Quality Solutions for {company_name}",
        "specifics": ["HEPA filtration systems", "Precise climate control", "Healthcare compliance", "Sterile environment maintenance"],
        "closing": "Let's ensure optimal air quality for your patients and staff!"
    },
    "Hospitality": {
        "subject": "Hotel Comfort Solutions for {company_name}",
        "specifics": ["Quiet guest room climate control", "Central system optimization", "Energy cost reduction", "24/7 monitoring support"],
        "closing": "Looking forward to enhancing your guest experience!"
    }
}

# -----------------------------
# HELPER FUNCTIONS
# -----------------------------
def is_valid_email(email):
    """Basic email validation."""
    regex = r"[^@]+@[^@]+\.[^@]+"
    return re.match(regex, email)

def generate_email(rpc_name, company_name, industry, havc_needs):
    template = INDUSTRY_TEMPLATES.get(industry.strip().title(), INDUSTRY_TEMPLATES["HVAC"])


    prompt = f"""Compose a short, persuasive email for {company_name} addressing their HVAC need: "{havc_needs}".
Highlight 2-3 key benefits ({', '.join(template['specifics'])}) as separate bullet points.
Keep it professional, catchy, and concise. Do not include greetings like 'Hi' or 'Dear' and do not include the company name in the bullet points."""

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "model": "meta-llama/Llama-3-7b-chat-hf",
        "messages": [
            {"role": "system", "content": "You are an HVAC consultant writing concise, professional, newsletter-style emails."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.7,
        "max_tokens": 150
    }

    try:
        response = requests.post(OPENROUTER_URL, headers=headers, json=data)
        response.raise_for_status()
        result = response.json()
        solution_content = result["choices"][0]["message"]["content"].strip()
        points = [line.strip("• ").strip() for line in solution_content.split("\n") if line.strip()]
    except Exception as e:
        print(f"AI generation error for {company_name}: {e}")
        points = [
            "Customized HVAC solutions to improve comfort",
            "Energy-efficient and reliable performance",
            "Optimized climate control for your space"
        ]

    points_html = "".join([f"<li>{p}</li>" for p in points])
    subject_text = template['subject'].format(company_name=company_name)

    email_body = f"""
<html>
  <body style="font-family: Arial, sans-serif; color:#333; background:#f9f9f9; padding:20px;">
    <div style="max-width:600px; margin:auto; background:#fff; border:1px solid #ddd; padding:25px; border-radius:8px;">
        <div style="text-align:center;">
            <img src="cid:logo" alt="LG Home Comfort" width="150" style="margin-bottom:20px;">
            <h2 style="color:#111; font-size:20px; font-weight:bold; margin-top:10px;">{subject_text}</h2>
        </div>

        <p><b>Hi {rpc_name.split()[0]},</b></p>
        <p>We at <b>LG Home Comfort</b> specialize in helping <b>{industry.lower()}</b> businesses like <b>{company_name}</b> stay comfortable, efficient, and stress-free.</p>

        <h3 style="color:#005bac;">Here’s how we can help:</h3>
        <ul style="margin-left:20px; color:#444;">
            {points_html}
        </ul>

        <p><b>{template['closing']}</b></p>

        <p style="margin-top:30px;">📞 (555) 123-4567 | ✉ solutions@lghomecomfort.com</p>
        <p>Best regards,<br><b>Sarvesh</b><br>HVAC Solutions Consultant</p>
    </div>
  </body>
</html>
"""
    return email_body, subject_text

def send_email(to_email, subject, content):
    try:
        msg = MIMEMultipart()
        msg["From"] = FROM_EMAIL
        msg["To"] = to_email
        msg["Subject"] = subject

        # Attach HTML content
        msg.attach(MIMEText(content, "html"))

        # Attach the logo image
        image_path = os.path.join(os.path.dirname(__file__), "lghomecomfort.jpeg")
        with open(image_path, "rb") as img_file:
            img = MIMEImage(img_file.read())
            img.add_header("Content-ID", "<logo>")
            img.add_header("Content-Disposition", "inline", filename="lghomecomfort.jpeg")
            msg.attach(img)

        # Send email
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(FROM_EMAIL, APP_PASSWORD)
            server.send_message(msg)

        print(f"Email sent to {to_email}")
        return True

    except smtplib.SMTPAuthenticationError:
        print(f"Failed to send email to {to_email}: Authentication Error. Check your App Password.")
        return False
    except Exception as e:
        print(f"Failed to send email to {to_email}: {e}")
        return False

def generate_and_send_emails(filename):
    df = pd.read_excel(filename)
    success_count = 0
    failed_count = 0

    for _, row in df.iterrows():
        company_name = str(row.get('Company Name', '')).strip()
        rpc_name = str(row.get('RPC Name', '')).strip()
        rpc_email = str(row.get('RPC Email Address', '')).strip()
        industry = str(row.get('Industry', '')).strip()
        havc_needs = str(row.get('HAVC Needs', '')).strip()

        if not all([company_name, rpc_name, rpc_email, industry, havc_needs]) or not is_valid_email(rpc_email):
            print(f"Skipping invalid row: {row.to_dict()}")
            failed_count += 1
            continue

        content, subject = generate_email(rpc_name, company_name, industry, havc_needs)
        if send_email(rpc_email, subject, content):
            success_count += 1
        else:
            failed_count += 1

        time.sleep(2)

    print(f"Finished sending emails. Success: {success_count}, Failed: {failed_count}")
    return success_count, failed_count
