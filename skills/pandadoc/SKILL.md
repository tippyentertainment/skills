---
name: pandadoc
version: 1.0.0
description: >
  Work with PandaDoc via its Public API: create and send documents from templates or PDFs,
  list and track documents, and use webhooks for status changes.
tags:
  - documents
  - esignature
  - sales
  - proposals
  - contracts
---

# PandaDoc Skill

Create, send, and manage documents, proposals, quotes, contracts, and e-signatures using the PandaDoc Public API.

## Configuration

**Required credential:** `PANDADOC_API_KEY` (stored in Settings → Integrations)

The platform handles authentication automatically. All requests include:
- Header `Authorization: Bearer {PANDADOC_API_KEY}`
- Header `Content-Type: application/json` (for JSON requests)
- Header `Content-Type: multipart/form-data` (for file uploads)

**Base URL:** `https://api.pandadoc.com/public/v1`

---

## Actions

### 1. Create Document from Template

Generate a document from an existing PandaDoc template with variable tokens.

**Parameters:**
- `action`: "create_from_template"
- `template_uuid`: UUID of the PandaDoc template
- `name`: Document name (supports {{token}} substitution)
- `recipients`: Array of `{email, first_name, last_name, role}`
- `tokens`: Array of `{name, value}` to fill template variables
- `metadata`: Optional `{external_id, source}` for CRM tracking
- `send`: Boolean - auto-send after creation (default: false)

**Example:**
```json
{
  "action": "create_from_template",
  "template_uuid": "TEMPLATE_UUID_HERE",
  "name": "Sales Proposal for {{customer_name}}",
  "recipients": [
    {
      "email": "john.doe@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "role": "Client"
    }
  ],
  "tokens": [
    { "name": "customer_name", "value": "Acme Corp" },
    { "name": "proposal_amount", "value": "25000" }
  ],
  "metadata": {
    "external_id": "crm-opportunity-12345",
    "source": "taskingtech-bot"
  },
  "send": false
}
```

**API Call:**
```
POST /documents
Authorization: Bearer {PANDADOC_API_KEY}
Content-Type: application/json

{
  "name": "Sales Proposal for Acme Corp",
  "template_uuid": "TEMPLATE_UUID_HERE",
  "recipients": [...],
  "tokens": [...],
  "metadata": {...}
}
```

**Response:**
```json
{
  "id": "DOCUMENT_UUID",
  "name": "Sales Proposal for Acme Corp",
  "status": "document.draft",
  "recipients": [...],
  "tokens": [...],
  "created_at": "2026-01-15T10:30:00Z"
}
```

---

### 2. Create Document from PDF Upload

Upload a local PDF file and create a PandaDoc document.

**Parameters:**
- `action`: "create_from_upload"
- `name`: Document name
- `file_path`: Path to local PDF file
- `recipients`: Array of recipients (optional)
- `tokens`: Array of tokens to fill form fields (optional)
- `send`: Boolean - auto-send (default: false)

**API Call:**
```
POST /documents
Content-Type: multipart/form-data

file: [PDF binary]
name: "Contract for Client"
recipients[0][email]: "client@example.com"
recipients[0][first_name]: "Jane"
recipients[0][last_name]: "Smith"
recipients[0][role]: "Signer"
```

**Note:** Uploaded files are NOT stored in PandaDoc. You must upload with every request.

---

### 3. Create Document from Public URL

Create a document from a publicly accessible PDF URL.

**Parameters:**
- `action`: "create_from_url"
- `name`: Document name
- `file_url`: Public URL to PDF file (must be publicly accessible)
- `recipients`: Array of recipients
- `tokens`: Array of tokens (optional)
- `send`: Boolean - auto-send (default: false)

**Example:**
```json
{
  "action": "create_from_url",
  "name": "NDA for New Partner",
  "file_url": "https://example.com/contracts/nda-template.pdf",
  "recipients": [
    {
      "email": "partner@company.com",
      "first_name": "Alex",
      "last_name": "Johnson",
      "role": "Signer"
    }
  ],
  "send": false
}
```

**API Call:**
```
POST /documents
Authorization: Bearer {PANDADOC_API_KEY}
Content-Type: application/json

{
  "name": "NDA for New Partner",
  "url": "https://example.com/contracts/nda-template.pdf",
  "recipients": [...]
}
```

---

### 4. Send Document for Signature

Send a draft document to recipients for e-signature.

**Parameters:**
- `action`: "send"
- `document_id`: UUID of the document to send
- `subject`: Email subject line (optional)
- `message`: Email message body (optional)
- `silent`: Boolean - suppress email notification (default: false)

**Example:**
```json
{
  "action": "send",
  "document_id": "DOCUMENT_UUID",
  "subject": "Please sign your proposal",
  "message": "Hi {{recipient.first_name}}, please review and sign the attached proposal.",
  "silent": false
}
```

**API Call:**
```
POST /documents/{document_id}/send
Authorization: Bearer {PANDADOC_API_KEY}
Content-Type: application/json

{
  "subject": "Please sign your proposal",
  "message": "Hi {{recipient.first_name}}, please review and sign.",
  "silent": false
}
```

---

### 5. Get Document Status

Check the current status of a document.

**Parameters:**
- `action`: "status"
- `document_id`: UUID of the document

**Example:**
```json
{
  "action": "status",
  "document_id": "DOCUMENT_UUID"
}
```

**API Call:**
```
GET /documents/{document_id}
Authorization: Bearer {PANDADOC_API_KEY}
```

**Response:**
```json
{
  "id": "DOCUMENT_UUID",
  "name": "Sales Proposal for Acme Corp",
  "status": "document.viewed",
  "recipients": [
    {
      "email": "john.doe@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "role": "Client",
      "status": "viewed",
      "viewed_at": "2026-01-15T11:00:00Z"
    }
  ],
  "created_at": "2026-01-15T10:30:00Z",
  "updated_at": "2026-01-15T11:00:00Z"
}
```

**Document Statuses:**
- `document.draft` - Document created, not sent
- `document.sent` - Sent to recipients, awaiting action
- `document.viewed` - Recipient has viewed the document
- `document.completed` - All recipients have signed
- `document.rejected` - Recipient declined to sign
- `document.expired` - Document expiration date passed

---

### 6. Download Document

Download a document as PDF.

**Parameters:**
- `action`: "download"
- `document_id`: UUID of the document

**Example:**
```json
{
  "action": "download",
  "document_id": "DOCUMENT_UUID"
}
```

**API Call:**
```
GET /documents/{document_id}/download
Authorization: Bearer {PANDADOC_API_KEY}
```

**Response:** Binary PDF file

---

### 7. List Documents

List all documents in the workspace.

**Parameters:**
- `action`: "list"
- `status`: Filter by status (optional)
- `limit`: Max results (default: 20, max: 100)
- `offset`: Pagination offset (default: 0)

**Example:**
```json
{
  "action": "list",
  "status": "document.sent",
  "limit": 50
}
```

**API Call:**
```
GET /documents?status=document.sent&limit=50
Authorization: Bearer {PANDADOC_API_KEY}
```

---

### 8. Webhook Integration

Set up webhooks to receive document status changes.

**Webhook Events:**
- `document.created`
- `document.sent`
- `document.viewed`
- `document.completed`
- `document.rejected`
- `document.expired`

**Webhook Payload:**
```json
{
  "event": "document.completed",
  "data": {
    "id": "DOCUMENT_UUID",
    "name": "Sales Proposal for Acme Corp",
    "status": "document.completed",
    "completed_at": "2026-01-15T14:30:00Z",
    "recipients": [...]
  }
}
```

**Setup in PandaDoc Dashboard:**
1. Go to Settings → API & Webhooks
2. Click "Add Webhook"
3. Enter your endpoint URL
4. Select events to subscribe to
5. Save and test

---

## Common Workflows

### Workflow 1: Create and Send Proposal

```
1. Create from template with tokens
2. Get document_id from response
3. Call send action with document_id
4. Monitor status via webhook or polling
```

### Workflow 2: Upload and Send Contract

```
1. Create from upload with PDF file
2. Add recipients and tokens
3. Send for signature
4. Download completed document
```

### Workflow 3: Track Document Status

```
1. Create document
2. Set up webhook for document.completed
3. When webhook fires, download completed document
4. Store in CRM or database
```

---

## Error Handling

**Common Errors:**

| Code | Description | Solution |
|------|-------------|----------|
| 400 | Bad Request | Check JSON body format, required fields |
| 401 | Unauthorized | Verify PANDADOC_API_KEY is valid |
| 403 | Forbidden | Check API key permissions for workspace |
| 404 | Not Found | Verify template_uuid or document_id exists |
| 429 | Rate Limited | Implement exponential backoff |

**Rate Limits:**
- Sandbox: 100 requests/minute
- Production: 500 requests/minute

---

## Best Practices

1. **Use Templates:** Create templates in PandaDoc UI for reusable documents
2. **Token Naming:** Use descriptive names like `{{customer_name}}` not `{{var1}}`
3. **Metadata:** Always include `external_id` for CRM tracking
4. **Webhooks:** Prefer webhooks over polling for status updates
5. **Error Handling:** Implement retry with exponential backoff
6. **Testing:** Use sandbox API key for development

---

## Integration with Tasking.tech

This skill integrates with Tasking.tech workflows:

1. **Create Workflow:** Set up automated document generation
2. **Webhook Handler:** Receive PandaDoc webhooks at Tasking.tech endpoint
3. **Task Creation:** Auto-create tasks when documents are completed
4. **Notifications:** Send Discord/Slack notifications on status changes

---

## Examples

### Create Proposal from Template

```json
{
  "action": "create_from_template",
  "template_uuid": "abc123-def456",
  "name": "Q1 Proposal for {{company}}",
  "recipients": [
    {
      "email": "ceo@acme.com",
      "first_name": "Jane",
      "last_name": "CEO",
      "role": "Signer"
    }
  ],
  "tokens": [
    { "name": "company", "value": "Acme Corp" },
    { "name": "amount", "value": "$50,000" },
    { "name": "valid_until", "value": "March 31, 2026" }
  ],
  "send": true
}
```

### Check Status and Download

```json
// First check status
{ "action": "status", "document_id": "doc-123" }

// If status is "document.completed", download
{ "action": "download", "document_id": "doc-123" }
```

---

## References

- [PandaDoc API Documentation](https://developers.pandadoc.com/)
- [Create Document from Upload](https://developers.pandadoc.com/reference/create-document-from-upload)
- [Create Document from Template](https://developers.pandadoc.com/reference/create-document)
- [Send Document](https://developers.pandadoc.com/reference/send-document)
- [Document Status](https://developers.pandadoc.com/reference/document-status)
- [Webhooks Guide](https://support.pandadoc.com/en/articles/9714963)