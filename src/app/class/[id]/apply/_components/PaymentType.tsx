'use client';
import {
  PaymentWidgetInstance,
  loadPaymentWidget,
} from '@tosspayments/payment-widget-sdk';
import { nanoid } from 'nanoid';
import { useRef } from 'react';
import { useAsync } from 'react-use';
import { usePaymentStore } from '@/store';

const NEXT_PUBLIC_TOSS_CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;

const PaymentType = ({ price }: { price: number }) => {
  const setPaymentWidget = usePaymentStore((state) => state.setPaymentWidget);
  const setPaymentMethodsWidget = usePaymentStore(
    (state) => state.setPaymentMethodsWidget,
  );

  const customerKey = nanoid();
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance['renderPaymentMethods']
  > | null>(null);

  useAsync(async () => {
    if (!NEXT_PUBLIC_TOSS_CLIENT_KEY) {
      return;
    }

    const paymentWidget = await loadPaymentWidget(
      NEXT_PUBLIC_TOSS_CLIENT_KEY,
      customerKey,
    );
    setPaymentWidget(paymentWidget);
    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      '#payment-widget',
      { value: price },
    );

    paymentWidget.renderAgreement('#agreement');

    paymentWidgetRef.current = paymentWidget;
    paymentMethodsWidgetRef.current = paymentMethodsWidget;
    setPaymentMethodsWidget(paymentMethodsWidget);
  }, []);

  return (
    <>
      <div id="payment-widget" style={{ width: '100%' }} />
      <div id="agreement" style={{ width: '100%' }} />
    </>
  );
};

export default PaymentType;
