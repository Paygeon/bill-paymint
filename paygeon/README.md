This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Using the tool

Paygeon offers users a platform to pay any invoices using multiple crypto options. Users also have the flexibility to upload invoices using files from their device or capture a new photo. The steps are described briefly below:

- Initially, the user needs to upload the invoice using an existing file on their device or by capturing a new photo.
- This automatically triggers the text recognition function, which looks for payment details. If found, further steps are provided to the user. Otherwise, an error message is displayed.
- From the recognized text, merchant details and the amount are extracted, along with the final amount to be paid, including charges.
- The user can then choose from five cryptocurrencies: BTC, ETH, LTC, DOGE, and TRX. The amount to be paid in the corresponding currency is automatically updated, along with the payment address.
- The user must pay to the provided address using the wallet app of their choice. The copy button provided allows the user to copy the address for payment. Hovering over the address for a couple of seconds enables a tooltip, aiding in verifying the address.
- Once done, the user can confirm the payment using the button provided, which triggers an acknowledgment email to both the user and the internal team.