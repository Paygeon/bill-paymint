# bill-paymint

## Description
This package offers users a platform to pay invoices using multiple cryptocurrency options. Users can upload invoices from their devices or capture a new photo.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Table of Contents
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Customization](#customization)
- [Configuration](#configuration)
- [Learn More](#learn-more)
- [Deploy on Vercel](#deploy-on-vercel)

## Getting Started
### Install Dependencies
```bash 
npm install
```

### Run the Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000)(or any other assigned port if port 3000 is busy, which can be found in the terminal) with your browser to see the result.

You can edit the page by modifying `paygeon/components/InvoiceUploader/InvoiceUploader.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to optimize and load Inter, a custom Google Font.

## Usage
- **Upload an Invoice**: Use an existing file on the device or capture a new photo.
- **Payment Details**: Further steps are provided if payment details are found. Otherwise, an error message is displayed.
- **Verify Amount**: Verify the invoice amount and final amount, including charges, to be paid.
- **Choose Cryptocurrency**: Choose from five cryptocurrencies: BTC, ETH, LTC, DOGE, and TRX.
- **Make Payment**: Pay the total amount in the selected cryptocurrency to the provided address using any wallet app.
- **Confirm Payment**: Once done, confirm the payment using the button provided, triggering an acknowledgment email to both the user and the internal team.

## Customization
Text is extracted from the uploaded image using Tesseract OCR. Various fields are further extracted using regex patterns, all being case-insensitive. Modify them according to your needs.

### Total Amount
The total amount should be followed by any of the keywords `Amount, Amount Due, Balance, Balance Due, Total, Total Due` followed by an optional `:` and `$`. The total amount can also contain `,`.

### Customer Data
Customer data should be mentioned using the keywords: `Bill To, Customer`, followed by an optional `:`, with details in the following three lines:

1. Name
2. Email address
3. Address

### Merchant Data
Merchant data should be mentioned using the keywords: `From, Merchant`, followed by an optional `:`, with details in the following three lines:

1. Name
2. Email address
3. Address

Merchant account number should be mentioned in the section with keywords `Notes, Memo`.

### Crypto Options
The currently supported options are `Bitcoin (BTC), Ethereum (ETH), Litecoin (LTC), Dogecoin (DOGE), and TRX`. 

## Configuration
### CryptAPI
The project uses [`CryptAPI`](https://cryptapi.io/) to fetch market prices and generate addresses to receive payments. 

- Update the callback URL in `paygeon/components/InvoiceUploader/InvoiceUploader.tsx`.
- Update the addresses for different cryptocurrencies and the email to receive payment confirmations in `paygeon/app/api/payment.ts`.

### EmailJS
The project uses [`EmilJS](https://www.emailjs.com/) to manage email notifications to the user and internal team. More information about setting up the EmailJS account can be found [here](https://www.abstractapi.com/guides/email-validation/react-send-email-from-your-app-without-a-backend). 

- Alter the template IDs and emails in the function `handleConfirmPayment` in `paygeon/components/InvoiceUploader/InvoiceUploader.tsx`.

## Learn More
To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.