// src/app/faq/page.tsx
"use client";

import { useState, memo } from "react";
import { ChevronDown } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: "Do you ship internationally?",
    answer: "Yes! We ship all over Australia and worldwide. Shipping times vary by location."
  },
  {
    question: "What is your return policy?",
    answer: "You can return any unworn and unwashed items within 30 days of delivery for a full refund."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is shipped, you'll receive a tracking number via email to monitor its progress."
  },
  {
    question: "Are your products true to size?",
    answer: "We recommend checking our size guide before ordering. Our clothing is designed to fit snugly for fitness activities."
  },
  {
    question: "Do you offer discounts or memberships?",
    answer: "Yes! Sign up for our newsletter to receive exclusive offers and early access to new products."
  },
  {
  question: "Can I exchange items for a different size?",
  answer: "Absolutely! If your item doesn’t fit, you can exchange it within 30 days for a different size, subject to availability."
},
{
  question: "How long does shipping take within Australia?",
  answer: "Domestic orders usually arrive within 3-7 business days, depending on your location."
},
{
  question: "Do you use sustainable materials?",
  answer: "Yes! Many of our products are made from eco-friendly and sustainable materials without compromising performance."
},
{
  question: "Can I cancel my order after placing it?",
  answer: "Orders can be cancelled within 2 hours of purchase. After that, we begin processing and shipping immediately."
},
{
  question: "What payment methods do you accept?",
  answer: "We accept all major credit and debit cards, Apple Pay, Google Pay, and PayPal for a fast and secure checkout."
},
{
  question: "Do you offer gift cards?",
  answer: "Yes! You can purchase digital gift cards in various amounts, perfect for friends and family who love fitness apparel."
}
];

const FAQItemComponent = ({ item }: { item: FAQItem }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4 px-4 bg-gray-100">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-left text-gray-800 hover:text-cyan-700 transition-colors duration-200"
      >
        <span className="text-lg font-semibold">{item.question}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-200 ${open ? "rotate-180 text-cyan-700" : ""}`}
        />
      </button>
      <div
        className={`mt-2 text-gray-600 overflow-hidden transition-all duration-300 ${open ? "max-h-96" : "max-h-0"}`}
      >
        <p>{item.answer}</p>
      </div>
    </div>
  );
};

const FAQPage = () => {
  return (
    <div className="bg-white min-h-screen px-4 md:px-20 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-cyan-700 mb-8 text-center">
        Frequently Asked Questions
      </h1>
      <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">
        Here are some of the most common questions we get from our customers. If you can&apos;t find your answer, feel free to contact us.
      </p>
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg divide-y divide-gray-200">
        {faqData.map((item, index) => (
          <FAQItemComponent key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default memo(FAQPage);
