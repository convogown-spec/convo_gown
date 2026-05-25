import sys
import json
import smtplib
from email.message import EmailMessage

def send_email(payload):
    name = payload.get("name", "Valued Customer")
    to_mail = payload.get("email")
    institution = payload.get("institution", "Not Specified")
    phone = payload.get("phone", "Not Specified")
    date = payload.get("date", "Not Specified")
    district = payload.get("district", "Not Specified")
    quantity = payload.get("quantity", "Not Specified")
    sizes = payload.get("sizes", [])
    services = payload.get("services", [])

    sizes_str = ", ".join(sizes) if sizes else "None selected"
    services_str = ", ".join(services) if services else "None selected"

    # Gmail Credentials
    from_mail = "convogown@gmail.com"
    app_password = "ssns gnvn thig drjn"

    # Setup Email message
    msg = EmailMessage()
    msg['Subject'] = f"Convo Gown Quote Confirmation - {institution}"
    msg['From'] = f"Convo Gown <{from_mail}>"
    msg['To'] = to_mail
    # Also BCC to ourselves so the coordination desk receives it instantly
    msg['Bcc'] = from_mail

    # HTML Body Design (Themed with cream/gold/midnight blue luxury palette)
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body {{
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #fdfcf9;
                color: #0a1128;
                margin: 0;
                padding: 0;
            }}
            .container {{
                max-width: 600px;
                margin: 40px auto;
                background: #ffffff;
                border: 1px solid rgba(197, 168, 112, 0.2);
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(10, 17, 40, 0.05);
            }}
            .header {{
                background-color: #0a1128;
                padding: 40px 30px;
                text-align: center;
                border-bottom: 3px solid #c5a870;
            }}
            .logo {{
                font-size: 28px;
                font-weight: bold;
                letter-spacing: 2px;
                color: #ffffff;
                margin: 0;
            }}
            .logo-gold {{
                color: #c5a870;
                font-style: italic;
            }}
            .content {{
                padding: 40px 30px;
            }}
            .greeting {{
                font-size: 20px;
                font-weight: 600;
                color: #0a1128;
                margin-top: 0;
                margin-bottom: 16px;
            }}
            .lead {{
                font-size: 16px;
                line-height: 1.6;
                color: #5e6675;
                margin-bottom: 30px;
            }}
            .details-table {{
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 30px;
                background: #fdfcf9;
                border-radius: 8px;
                overflow: hidden;
            }}
            .details-table td {{
                padding: 16px 20px;
                border-bottom: 1px solid rgba(197, 168, 112, 0.1);
                font-size: 15px;
            }}
            .details-table tr:last-child td {{
                border-bottom: none;
            }}
            .label {{
                font-weight: 600;
                color: #0a1128;
                width: 35%;
            }}
            .value {{
                color: #5e6675;
            }}
            .cta-box {{
                text-align: center;
                background-color: #fcfbfa;
                padding: 24px;
                border: 1px dashed #c5a870;
                border-radius: 12px;
                margin-bottom: 30px;
            }}
            .cta-text {{
                font-size: 15px;
                color: #0a1128;
                margin: 0 0 16px 0;
                font-weight: 500;
            }}
            .btn {{
                display: inline-block;
                background-color: #c5a870;
                color: #ffffff !important;
                text-decoration: none;
                padding: 14px 28px;
                border-radius: 50px;
                font-weight: bold;
                font-size: 14px;
                letter-spacing: 1px;
                transition: background 0.3s ease;
            }}
            .footer {{
                background-color: #0a1128;
                padding: 30px;
                text-align: center;
                color: rgba(255, 255, 255, 0.6);
                font-size: 13px;
                line-height: 1.5;
            }}
            .footer a {{
                color: #c5a870;
                text-decoration: none;
            }}
            .office-list {{
                margin-top: 10px;
                font-weight: 500;
                color: rgba(255, 255, 255, 0.8);
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">CONVO <span class="logo-gold">GOWN</span></div>
            </div>
            <div class="content">
                <h2 class="greeting">Dear {name},</h2>
                <p class="lead">
                    Thank you for requesting a tailored convocation proposal. We have successfully registered your request. Our regional coordinator will reach out to you within 24 hours with custom pricing details.
                </p>
                
                <table class="details-table">
                    <tr>
                        <td class="label">Institution</td>
                        <td class="value">{institution}</td>
                    </tr>
                    <tr>
                        <td class="label">Contact Phone</td>
                        <td class="value">{phone}</td>
                    </tr>
                    <tr>
                        <td class="label">Ceremony Date</td>
                        <td class="value">{date}</td>
                    </tr>
                    <tr>
                        <td class="label">Operational District</td>
                        <td class="value">{district}</td>
                    </tr>
                    <tr>
                        <td class="label">Estimated Gowns</td>
                        <td class="value">{quantity}</td>
                    </tr>
                    <tr>
                        <td class="label">Size Requirements</td>
                        <td class="value">{sizes_str}</td>
                    </tr>
                    <tr>
                        <td class="label">Services Requested</td>
                        <td class="value">{services_str}</td>
                    </tr>
                </table>

                <div class="cta-box">
                    <p class="cta-text">Need urgent changes or custom colors? Connect with our team instantly:</p>
                    <a href="https://wa.me/918891360876?text=Hi%20Convo%20Gown%2C%20following%20up%20on%20our%20quote%20request%20for%20{institution}" class="btn">CHAT ON WHATSAPP</a>
                </div>
            </div>
            <div class="footer">
                <p>
                    <strong>Convo Gown</strong> &bull; Kerala's Trusted Convocation Partner<br>
                    <span class="office-list">Offices: Kothamangalam | Thrissur | Changanassery</span>
                </p>
                <p>
                    Email: <a href="mailto:coordination@convogown.com">coordination@convogown.com</a> &bull; Phone: <a href="tel:+918891360876">+91 88913 60876</a>
                </p>
            </div>
        </div>
    </body>
    </html>
    """

    msg.add_alternative(html_content, subtype='html')

    # Setup SMTP TLS Connection and Send
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(from_mail, app_password)
        server.send_message(msg)
        server.quit()
        print(json.dumps({"status": "success", "message": "Email sent successfully"}))
    except Exception as e:
        print(json.dumps({"status": "error", "message": str(e)}))

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"status": "error", "message": "No input payload provided"}))
        sys.exit(1)
    
    try:
        payload_data = json.loads(sys.argv[1])
        send_email(payload_data)
    except Exception as e:
        print(json.dumps({"status": "error", "message": f"Execution failed: {str(e)}"}))
