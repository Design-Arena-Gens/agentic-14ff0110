'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  CreditCard,
  Truck,
  Timer,
  ShieldCheck,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { useCart } from '@/components/providers/cart-provider';

type CheckoutStep = 'delivery' | 'schedule' | 'payment' | 'review';

const deliveryOptions = [
  {
    id: 'delivery',
    title: 'Neighborhood delivery',
    description: 'Hand-delivered by our FreshHarvest couriers within a 2-hour window.',
    fee: 5.99
  },
  {
    id: 'pickup',
    title: 'Curbside pickup',
    description:
      'Skip the line—pull up to your chosen market and we will load your groceries.',
    fee: 0
  }
];

const timeslots = [
  '8:00 – 10:00 AM',
  '10:00 AM – 12:00 PM',
  '12:00 – 2:00 PM',
  '2:00 – 4:00 PM',
  '4:00 – 6:00 PM',
  '6:00 – 8:00 PM'
];

const paymentMethods = [
  { id: 'card', label: 'Credit or debit card', icon: CreditCard },
  { id: 'apple-pay', label: 'Apple Pay', icon: ShieldCheck },
  { id: 'google-pay', label: 'Google Pay', icon: ShieldCheck },
  { id: 'snap-ebt', label: 'SNAP EBT', icon: ShieldCheck }
];

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [activeStep, setActiveStep] = useState<CheckoutStep>('delivery');
  const [deliveryMethod, setDeliveryMethod] = useState(deliveryOptions[0].id);
  const [selectedTimeslot, setSelectedTimeslot] = useState(timeslots[2]);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0].id);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const deliveryFee = useMemo(() => {
    const option = deliveryOptions.find((option) => option.id === deliveryMethod);
    return option ? option.fee : 0;
  }, [deliveryMethod]);

  const orderTotal = useMemo(
    () => subtotal + deliveryFee - 3,
    [subtotal, deliveryFee]
  );

  const steps: { id: CheckoutStep; label: string; icon: React.ReactNode }[] = [
    { id: 'delivery', label: 'Delivery details', icon: <Truck className="h-5 w-5" /> },
    { id: 'schedule', label: 'Schedule', icon: <Calendar className="h-5 w-5" /> },
    { id: 'payment', label: 'Payment', icon: <CreditCard className="h-5 w-5" /> },
    { id: 'review', label: 'Review', icon: <ShieldCheck className="h-5 w-5" /> }
  ];

  const handleOrderSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOrderPlaced(true);
    clearCart();
  };

  return (
    <div className="bg-gradient-to-b from-cream-50 via-white to-cream-100 pb-16 pt-12">
      <div className="section-container grid gap-8 lg:grid-cols-[1.3fr,1fr]">
        <div className="space-y-6">
          <header className="rounded-[2.5rem] bg-white p-8 shadow-soft ring-1 ring-cream-200">
            <span className="inline-flex items-center gap-2 rounded-full bg-mint-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-mint-700">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Secure checkout
            </span>
            <h1 className="mt-4 text-3xl font-bold text-slate-900">
              Finish your order
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              Choose delivery or pickup, pick a time that fits your schedule, and
              pay securely. You can always edit your selections before placing the
              order.
            </p>
          </header>

          <nav aria-label="Checkout steps" className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-cream-200">
            <ol className="grid gap-4 sm:grid-cols-4">
              {steps.map((step) => {
                const isActive = activeStep === step.id;
                return (
                  <li key={step.id}>
                    <button
                      type="button"
                      onClick={() => setActiveStep(step.id)}
                      className={`flex w-full flex-col items-center gap-2 rounded-2xl border px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-400 focus-visible:ring-offset-2 ${
                        isActive
                          ? 'border-mint-300 bg-mint-50 text-mint-700'
                          : 'border-cream-200 text-slate-500 hover:border-mint-200 hover:text-mint-600'
                      }`}
                    >
                      <span aria-hidden="true">{step.icon}</span>
                      {step.label}
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>

          <form className="space-y-6" onSubmit={handleOrderSubmit}>
            {activeStep === 'delivery' && (
              <motion.section
                key="delivery"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-cream-200"
              >
                <h2 className="text-xl font-semibold text-slate-900">
                  Delivery or pickup
                </h2>
                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  {deliveryOptions.map((option) => (
                    <label
                      key={option.id}
                      className={`flex flex-col gap-3 rounded-2xl border px-4 py-4 transition ${
                        deliveryMethod === option.id
                          ? 'border-mint-300 bg-mint-50'
                          : 'border-cream-200 hover:border-mint-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-semibold text-slate-900">
                            {option.title}
                          </span>
                          <p className="mt-1 text-xs text-slate-500">
                            {option.description}
                          </p>
                        </div>
                        <span className="rounded-full bg-cream-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                          {option.fee === 0 ? 'Free' : `$${option.fee.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <input
                          type="radio"
                          name="delivery-method"
                          value={option.id}
                          checked={deliveryMethod === option.id}
                          onChange={() => setDeliveryMethod(option.id)}
                          className="h-4 w-4 border-cream-300 text-mint-600 focus:ring-mint-500"
                          aria-label={`Select ${option.title}`}
                        />
                        Choose {option.title.toLowerCase()}
                      </div>
                    </label>
                  ))}
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="address-line1" className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Street address
                    </label>
                    <input
                      id="address-line1"
                      name="address1"
                      required
                      placeholder="124 Berry Street"
                      className="mt-1 w-full rounded-2xl border border-cream-300 bg-cream-50 px-4 py-2 text-sm text-slate-800 focus:border-mint-400 focus:outline-none focus:ring-2 focus:ring-mint-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="address-line2" className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Apt / Suite
                    </label>
                    <input
                      id="address-line2"
                      name="address2"
                      placeholder="Apartment 3C"
                      className="mt-1 w-full rounded-2xl border border-cream-300 bg-cream-50 px-4 py-2 text-sm text-slate-800 focus:border-mint-400 focus:outline-none focus:ring-2 focus:ring-mint-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                      City
                    </label>
                    <input
                      id="city"
                      name="city"
                      required
                      defaultValue="Brooklyn"
                      className="mt-1 w-full rounded-2xl border border-cream-300 bg-cream-50 px-4 py-2 text-sm text-slate-800 focus:border-mint-400 focus:outline-none focus:ring-2 focus:ring-mint-200"
                    />
                  </div>
                  <div className="grid grid-cols-[2fr,1fr] gap-3">
                    <div>
                      <label htmlFor="state" className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                        State
                      </label>
                      <input
                        id="state"
                        name="state"
                        required
                        defaultValue="NY"
                        className="mt-1 w-full rounded-2xl border border-cream-300 bg-cream-50 px-4 py-2 text-sm text-slate-800 focus:border-mint-400 focus:outline-none focus:ring-2 focus:ring-mint-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="zip" className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                        ZIP
                      </label>
                      <input
                        id="zip"
                        name="zip"
                        required
                        inputMode="numeric"
                        pattern="[0-9]{5}"
                        defaultValue="11222"
                        className="mt-1 w-full rounded-2xl border border-cream-300 bg-cream-50 px-3 py-2 text-sm text-slate-800 focus:border-mint-400 focus:outline-none focus:ring-2 focus:ring-mint-200"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveStep('schedule')}
                    className="inline-flex items-center gap-2 rounded-full bg-mint-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-mint-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-400 focus-visible:ring-offset-2"
                  >
                    Continue to schedule
                  </button>
                </div>
              </motion.section>
            )}

            {activeStep === 'schedule' && (
              <motion.section
                key="schedule"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-cream-200"
              >
                <h2 className="text-xl font-semibold text-slate-900">
                  Schedule your {deliveryMethod === 'pickup' ? 'pickup' : 'delivery'}
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {timeslots.map((timeslot) => (
                    <label
                      key={timeslot}
                      className={`flex flex-col gap-1 rounded-2xl border px-4 py-4 text-sm font-semibold text-slate-700 transition ${
                        selectedTimeslot === timeslot
                          ? 'border-mint-300 bg-mint-50 text-mint-700'
                          : 'border-cream-200 hover:border-mint-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Timer className="h-4 w-4 text-mint-600" aria-hidden="true" />
                        {timeslot}
                      </div>
                      <span className="text-xs font-medium text-slate-500">
                        {selectedTimeslot === timeslot
                          ? 'Reserved'
                          : 'Spots available'}
                      </span>
                      <input
                        type="radio"
                        name="timeslot"
                        value={timeslot}
                        checked={selectedTimeslot === timeslot}
                        onChange={() => setSelectedTimeslot(timeslot)}
                        className="sr-only"
                      />
                    </label>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveStep('delivery')}
                    className="text-sm font-semibold text-slate-600 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-300 focus-visible:ring-offset-2"
                  >
                    Back to delivery details
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveStep('payment')}
                    className="inline-flex items-center gap-2 rounded-full bg-mint-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-mint-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-400 focus-visible:ring-offset-2"
                  >
                    Continue to payment
                  </button>
                </div>
              </motion.section>
            )}

            {activeStep === 'payment' && (
              <motion.section
                key="payment"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-cream-200"
              >
                <h2 className="text-xl font-semibold text-slate-900">
                  Payment method
                </h2>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    const isSelected = paymentMethod === method.id;
                    return (
                      <label
                        key={method.id}
                        className={`flex items-center gap-3 rounded-2xl border px-4 py-4 transition ${
                          isSelected
                            ? 'border-mint-300 bg-mint-50 text-mint-700'
                            : 'border-cream-200 hover:border-mint-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment-method"
                          value={method.id}
                          checked={isSelected}
                          onChange={() => setPaymentMethod(method.id)}
                          className="h-4 w-4 border-cream-300 text-mint-600 focus:ring-mint-500"
                        />
                        <Icon className="h-5 w-5 text-mint-600" aria-hidden="true" />
                        <span className="text-sm font-semibold">{method.label}</span>
                      </label>
                    );
                  })}
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="card-name" className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Cardholder name
                    </label>
                    <input
                      id="card-name"
                      name="card-name"
                      required={paymentMethod === 'card'}
                      placeholder="Taylor Martinez"
                      className="mt-1 w-full rounded-2xl border border-cream-300 bg-cream-50 px-4 py-2 text-sm text-slate-800 focus:border-mint-400 focus:outline-none focus:ring-2 focus:ring-mint-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="card-number" className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Card number
                    </label>
                    <input
                      id="card-number"
                      name="card-number"
                      required={paymentMethod === 'card'}
                      inputMode="numeric"
                      placeholder="4242 4242 4242 4242"
                      className="mt-1 w-full rounded-2xl border border-cream-300 bg-cream-50 px-4 py-2 text-sm text-slate-800 focus:border-mint-400 focus:outline-none focus:ring-2 focus:ring-mint-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="card-exp" className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Expiration date
                    </label>
                    <input
                      id="card-exp"
                      name="card-exp"
                      required={paymentMethod === 'card'}
                      placeholder="MM / YY"
                      className="mt-1 w-full rounded-2xl border border-cream-300 bg-cream-50 px-4 py-2 text-sm text-slate-800 focus:border-mint-400 focus:outline-none focus:ring-2 focus:ring-mint-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="card-cvc" className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Security code
                    </label>
                    <input
                      id="card-cvc"
                      name="card-cvc"
                      required={paymentMethod === 'card'}
                      inputMode="numeric"
                      placeholder="CVC"
                      className="mt-1 w-full rounded-2xl border border-cream-300 bg-cream-50 px-4 py-2 text-sm text-slate-800 focus:border-mint-400 focus:outline-none focus:ring-2 focus:ring-mint-200"
                    />
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveStep('schedule')}
                    className="text-sm font-semibold text-slate-600 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-300 focus-visible:ring-offset-2"
                  >
                    Back to schedule
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveStep('review')}
                    className="inline-flex items-center gap-2 rounded-full bg-mint-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-mint-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-400 focus-visible:ring-offset-2"
                  >
                    Review order
                  </button>
                </div>
              </motion.section>
            )}

            {activeStep === 'review' && (
              <motion.section
                key="review"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-cream-200"
              >
                <h2 className="text-xl font-semibold text-slate-900">
                  Review and place order
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  You&apos;ll receive an email confirmation and SMS reminders when your
                  order is on the way.
                </p>
                <dl className="mt-6 space-y-3 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <dt>Delivery method</dt>
                    <dd className="font-semibold text-slate-800">
                      {
                        deliveryOptions.find((option) => option.id === deliveryMethod)
                          ?.title
                      }
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Scheduled</dt>
                    <dd className="font-semibold text-slate-800">{selectedTimeslot}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Payment</dt>
                    <dd className="font-semibold text-slate-800">
                      {
                        paymentMethods.find((method) => method.id === paymentMethod)
                          ?.label
                      }
                    </dd>
                  </div>
                </dl>

                <fieldset className="mt-6 space-y-2">
                  <legend className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Order notes
                  </legend>
                  <textarea
                    name="order-notes"
                    rows={4}
                    className="w-full rounded-2xl border border-cream-300 bg-cream-50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-mint-400 focus:outline-none focus:ring-2 focus:ring-mint-200"
                    placeholder="Add delivery instructions for your courier..."
                  />
                </fieldset>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <Link
                    href="/cart"
                    className="text-sm font-semibold text-slate-600 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-300 focus-visible:ring-offset-2"
                  >
                    Edit cart
                  </Link>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-mint-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-mint-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-400 focus-visible:ring-offset-2"
                  >
                    Place order · ${orderTotal.toFixed(2)}
                  </button>
                </div>
                {orderPlaced && (
                  <div className="mt-4 flex items-center gap-2 rounded-full bg-mint-100 px-4 py-2 text-sm font-semibold text-mint-700">
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                    Order confirmed! Check your inbox for the receipt.
                  </div>
                )}
              </motion.section>
            )}
          </form>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[2.5rem] bg-white p-8 shadow-soft ring-1 ring-cream-200">
            <h2 className="text-xl font-semibold text-slate-900">Order summary</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {items.length === 0 && !orderPlaced && (
                <li className="rounded-2xl bg-cream-50 px-4 py-3 text-sm text-slate-500">
                  Your cart is empty. Add items to complete checkout.
                </li>
              )}
              {items.map((item) => (
                <li
                  key={item.product.id}
                  className="flex items-center justify-between rounded-2xl bg-cream-50 px-4 py-3"
                >
                  <div>
                    <p className="font-semibold text-slate-800">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      Qty {item.quantity} · ${item.product.price.toFixed(2)}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
            <dl className="mt-6 space-y-3 text-sm text-slate-600">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd className="font-semibold text-slate-800">
                  ${subtotal.toFixed(2)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt>Delivery</dt>
                <dd className="font-semibold text-slate-800">
                  ${deliveryFee.toFixed(2)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt>Loyalty savings</dt>
                <dd className="font-semibold text-mint-700">-$3.00</dd>
              </div>
              <div className="flex justify-between border-t border-cream-200 pt-4 text-base font-semibold text-slate-900">
                <dt>Total due</dt>
                <dd>${orderTotal.toFixed(2)}</dd>
              </div>
            </dl>
            <p className="mt-4 text-xs text-slate-500">
              Transactions are encrypted and securely processed. By placing this order
              you agree to our terms of service and FreshRewards membership policy.
            </p>
          </div>
          <div className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-cream-200">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Need a hand?
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Text us at <a href="sms:+17185551042" className="font-semibold text-mint-700">718-555-1042</a>{' '}
              or open live chat for delivery updates and substitutions.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
