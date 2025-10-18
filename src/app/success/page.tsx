"use client";

import Link from "next/link";
import { memo, useEffect } from "react";
import { useCartStore } from "../../store/card-store";
import {
  CheckCircle,
  Home,
  MessageCircle,
  Package,
  ShoppingBag,
  Truck,
} from "lucide-react";

const SuccessPage = () => {
  const { clearCart } = useCartStore();
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-green-400 rounded-full blur-2xl opacity-30"></div>
            <div className="relative bg-white rounded-full p-6 shadow-2xl">
              <CheckCircle size={80} className="text-green-600" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Thank you for your purchase
          </p>
          <p className="text-gray-600 mb-6">
            Your order is being processed and will be shipped soon.
          </p>

          {/* Order Number */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-8">
            <p className="text-gray-600 text-sm font-medium mb-2">
              Your Order Number
            </p>
            <p className="text-3xl font-bold text-gray-900">3819203812903</p>
            <p className="text-gray-600 text-sm mt-2">
              Keep this number for your records
            </p>
          </div>

          {/* Timeline Steps */}
          <div className="space-y-4 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              What Happens Next?
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle size={20} className="text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-900">Order Confirmed</p>
                  <p className="text-sm text-gray-600">
                    Your payment has been received
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <Package size={20} className="text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-900">
                    Preparing Your Order
                  </p>
                  <p className="text-sm text-gray-600">
                    We're getting your items ready to ship
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
                  <Truck size={20} className="text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-900">On The Way</p>
                  <p className="text-sm text-gray-600">
                    Your order will be shipped within 1-2 business days
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                  <Home size={20} className="text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-900">Delivered</p>
                  <p className="text-sm text-gray-600">
                    You'll receive a tracking number via email
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Email Confirmation */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-gray-700">
              📧 A confirmation email has been sent to your registered email
              address with your order details and tracking information.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href={"/orders"}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition duration-300 transform hover:scale-105 shadow-lg"
          >
            <Truck size={20} />
            Track Your Order
          </Link>
          <Link
            href={"/"}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition duration-300 transform hover:scale-105 shadow-lg"
          >
            <ShoppingBag size={20} />
            Continue Shopping
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm mb-4">Have any questions?</p>
          <Link
            href={"/help"}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition duration-300"
          >
            <MessageCircle size={18} />
            Contact Our Support Team
          </Link>
        </div>
      </div>
    </div>
  );
};

export default memo(SuccessPage);
