import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта на почту мастера goodwork163@yandex.ru"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    message = body.get('message', '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Имя и телефон обязательны'}, ensure_ascii=False)
        }

    smtp_password = os.environ.get('SMTP_PASSWORD', '')
    from_email = 'goodwork163@yandex.ru'
    to_email = 'goodwork163@yandex.ru'

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка с сайта — {name}'
    msg['From'] = from_email
    msg['To'] = to_email

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 500px; background: #f9f9f9; padding: 24px; border-radius: 12px;">
      <h2 style="color: #FF6B00; margin-bottom: 16px;">🔧 Новая заявка с сайта</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #888; width: 120px;">Имя:</td>
          <td style="padding: 8px 0; font-weight: bold; color: #222;">{name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #888;">Телефон:</td>
          <td style="padding: 8px 0; font-weight: bold; color: #FF6B00;">
            <a href="tel:{phone}" style="color: #FF6B00;">{phone}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #888; vertical-align: top;">Сообщение:</td>
          <td style="padding: 8px 0; color: #222;">{message or '—'}</td>
        </tr>
      </table>
    </div>
    """

    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP_SSL('smtp.yandex.ru', 465) as server:
        server.login(from_email, smtp_password)
        server.sendmail(from_email, to_email, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True}, ensure_ascii=False)
    }
