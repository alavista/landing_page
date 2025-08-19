// script.js

// Invia i dati e mostra risultato nel modal
async function sendContactMail() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('button[type="button"]');

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    submitBtn.disabled = true;

    const payload = {
        nome:      form.nome.value.trim(),
        cellulare: form.cellulare.value.trim(),
        oggetto:   form.oggetto.value.trim(),
        messaggio: form.messaggio.value.trim(),
        destinatario_email: "andrea.lavista@outlook.it" // destinatario fisso o da campo nascosto
    };

    try {
        const res = await fetch('http://127.0.0.1:8025/send_email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            form.reset();
            new bootstrap.Modal(document.getElementById('successModal')).show();
        } else {
            new bootstrap.Modal(document.getElementById('errorModal')).show();
        }
    } catch {
        new bootstrap.Modal(document.getElementById('errorModal')).show();
    }

    submitBtn.disabled = false;
}

/**
 * container: elemento in cui iniettare l’alert
 * variant: 'success' o 'danger'
 * iconClass: icona da mostrare (Bootstrap Icons)
 * text: testo del messaggio (string)
 * mailHref / mailText (opzionali): per il link mailto
 */
function renderAlert(container, variant, iconClass, text, mailHref = '', mailText = '') {
  container.innerHTML = '';  
  container.className = `alert alert-${variant} d-flex align-items-center`;

  // icona
  const icon = document.createElement('i');
  icon.className = `bi ${iconClass} me-2 fs-4`;
  container.appendChild(icon);

  // testo
  const span = document.createElement('span');
  span.textContent = text;
  container.appendChild(span);

  // link mailto (se fornito)
  if (mailHref && mailText) {
    const a = document.createElement('a');
    a.href = mailHref;
    a.textContent = mailText;
    a.className = 'text-decoration-underline ms-1';
    container.appendChild(a);
  }
}
