# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# Transaction API
# VoxLedger — Transactions API

> All endpoints require the user to be authenticated.
> Include the token received from login in every request header.

```
Authorization: Bearer <token>
```

---

## Base URL

```
http://localhost:3000/api/transactions
```

---

## Endpoints

### 1. Add a Transaction
**POST** `/api/transactions`

The frontend AI should parse the user's voice/text input and send the structured result here.

**Request Body**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `transactionType` | `string` | ✅ | `"sale"` or `"expense"` |
| `item` | `string` | ✅ | Name of the item e.g. `"Beans"` |
| `amount` | `number` | ✅ | Amount in local currency e.g. `5000` |
| `rawText` | `string` | ❌ | Original voice/text input e.g. `"Sold beans 5000"` |
| `date` | `string` | ❌ | ISO date string. Defaults to current date/time if omitted |
| `currency` | `string` | ❌ | Currency code e.g. `"NGN"`. Defaults to `"NGN"` |

**Example Request**
```json
{
  "rawText": "Sold beans 5000",
  "transactionType": "sale",
  "item": "Beans",
  "amount": 5000
}
```

**Example Response**
```json
{
  "success": true,
  "transaction": {
    "_id": "685a3f2c1d4e8b0012abc123",
    "user": "685a3f1a1d4e8b0012abc111",
    "rawText": "Sold beans 5000",
    "transactionType": "sale",
    "item": "Beans",
    "amount": 5000,
    "currency": "NGN",
    "date": "2026-02-26T10:00:00.000Z"
  }
}
```

---

### 2. Get All Transactions
**GET** `/api/transactions`

Returns all transactions for the logged-in user, sorted by most recent first.

**No request body needed.**

**Example Response**
```json
{
  "success": true,
  "count": 2,
  "transactions": [
    {
      "_id": "685a3f2c1d4e8b0012abc123",
      "transactionType": "sale",
      "item": "Beans",
      "amount": 5000,
      "date": "2026-02-26T10:00:00.000Z"
    },
    {
      "_id": "685a3f2c1d4e8b0012abc456",
      "transactionType": "expense",
      "item": "Rice",
      "amount": 1500,
      "date": "2026-02-25T08:30:00.000Z"
    }
  ]
}
```

---

### 3. Delete a Transaction
**DELETE** `/api/transactions/:id`

Deletes a single transaction by its ID. Each transaction object returned from the list endpoint contains an `_id` field — pass that as the route parameter.

**URL Parameter**
| Param | Description |
|-------|-------------|
| `:id` | The `_id` of the transaction to delete |

**Example Request**
```
DELETE /api/transactions/685a3f2c1d4e8b0012abc123
```

**Example Response**
```json
{
  "success": true,
  "message": "Transaction deleted"
}
```

---

### 4. Get Profit Summary
**GET** `/api/transactions/summary`

Returns a high-level profit breakdown for the logged-in user across all their transactions.

**No request body needed.**

**Example Response**
```json
{
  "success": true,
  "summary": {
    "totalSales": 25000,
    "totalExpenses": 10000,
    "profit": 15000,
    "totalTransactions": 12
  }
}
```

---

### 5. Get Analytics
**GET** `/api/transactions/analytics`

Returns detailed market analytics for the logged-in user.

**No request body needed.**

**Example Response**
```json
{
  "success": true,
  "analytics": {
    "topSellingItems": [
      { "item": "beans", "count": 12 },
      { "item": "rice", "count": 9 }
    ],
    "topExpenses": [
      { "item": "transport", "count": 7 },
      { "item": "rice", "count": 5 }
    ],
    "transactionsByDayOfWeek": {
      "Monday": 18,
      "Tuesday": 22,
      "Wednesday": 15,
      "Thursday": 20,
      "Friday": 30,
      "Saturday": 25,
      "Sunday": 10
    },
    "topItemByDayOfWeek": {
      "Monday": { "item": "beans", "count": 4 },
      "Tuesday": { "item": "rice", "count": 6 },
      "Wednesday": null,
      "Thursday": { "item": "sugar", "count": 3 },
      "Friday": { "item": "beans", "count": 8 },
      "Saturday": { "item": "yam", "count": 5 },
      "Sunday": null
    },
    "monthlyBreakdown": {
      "Jan 2026": { "sales": 12000, "expenses": 5000, "profit": 7000 },
      "Feb 2026": { "sales": 13000, "expenses": 5000, "profit": 8000 }
    }
  }
}
```

---

## Error Responses

All endpoints return errors in this format:

```json
{
  "success": false,
  "message": "Description of what went wrong"
}
```

| Status Code | Meaning |
|-------------|---------|
| `400` | Missing or invalid fields in the request |
| `401` | Not authenticated — token missing or invalid |
| `403` | Authenticated but not allowed to perform this action |
| `404` | Transaction not found |
| `500` | Server error |
