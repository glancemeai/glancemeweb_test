'use client';

import { useRouter } from "next/navigation";
import style from "./price.module.css";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Apis from "@/app/service/hooks/ApiSlugs";
import { setAlert } from "@/app/redux/utils/message";
import Header from "../component/header_v1/header";
import PriceCard from "@/app/components/utils/cards/price/price";
import { PriceCardSkeleton } from "@/app/components/utils/skeleton/skeleton";
import Script from "next/script";

export interface PlansFeatures {
  name: string;
  creditType: string;
  credits: number;
  _id: string;
}

export interface PlansData {
  _id: string;
  name: string;
  price: number;
  durationInDays: number;
  currency: string;
  features: PlansFeatures[];
  createdAt: string;
  updatedAt: string;
  videoLimit: number;
  __v: number;
}

const Price = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [dataProfile, setDataProfile] = useState<any>(null);
  const [plansData, setPlansData] = useState<PlansData[] | null>(null);
  
  const handleApiError = useCallback((message: string) => {
    dispatch(
      setAlert({
        data: { message, show: true, type: "error" },
      })
    );
  },[dispatch]);
  // Fetch user details
  const fetchUserDetails = useCallback(async () => {
    const apis = Apis();
    try {
      const response = await apis.UserDetails("profile");
      if (response.status === 200) {
        setDataProfile(response);
      } else {
        handleApiError(response.message);
        router.push("/login");
      }
    } catch (error: any) {
      handleApiError(error.message);
    }
  },[handleApiError,router]);

  // Fetch plans details
  const fetchPlanDetails = useCallback(async () => {
    const apis = Apis();
    setLoading(true);
    try {
      const response = await apis.GetPlans();
      if (response.status === 200) {
        setPlansData(response.data);
      } else {
        handleApiError(response.message);
      }
    } catch (error: any) {
      handleApiError(error.message);
    } finally {
      setLoading(false);
    }
  },[handleApiError]);

  // Handle payment
  const handlePayment = async (planId: string) => {
    const apis = Apis();
    try {
      const paymentResponse = await apis.CreatePayment({
        planId,
        currency: "USD",
      });

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: paymentResponse.order.amount,
        currency: paymentResponse.order.currency,
        name: "Glanceme.Ai",
        description: `Payment for ${paymentResponse.paymentData.name}`,
        order_id: paymentResponse.order.id,
        prefill: {
          name: dataProfile?.data?.name || "",
          email: dataProfile?.data?.email || "",
        },
        theme: {
          color: "#3399cc",
          logo: `https://glanceme.ai/images/logo.png`,
        },
        handler: async (response: any) => {
          try {
            const verifyResponse = await apis.VerifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              paymentId: paymentResponse.paymentId,
            });

            const redirectUrl = verifyResponse?.success
              ? `/profile?status=success&subscriptionId=${verifyResponse?.subscription._id}`
              : "/profile?status=failed";
            router.push(redirectUrl);
          } catch (error: any) {
            console.error("Verification Error:", error.message);
            dispatch(
              setAlert({
                data: { message:"Verification Error: "+error.message, show: true, type: "error" },
              })
            );
          }
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error: any) {
      console.error("Payment Error:", error.message);
      dispatch(
        setAlert({
          data: { message:"Something went wrong. Please try again", show: true, type: "error" },
        })
      );
    }
  };

  // Centralized error handler


  // Initial data fetching
  useEffect(() => {
    fetchUserDetails();
    fetchPlanDetails();
  }, [fetchPlanDetails,fetchUserDetails]);

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <Header
        image={dataProfile?.data?.user?.image}
        title="Price"
        backlink="/dashboard"
        forward=""
      />
      <div className={style.main}>
        {loading ? (
          <>
            <PriceCardSkeleton />
            <PriceCardSkeleton />
            <PriceCardSkeleton />
          </>
        ) : (
          plansData?.map((plan: PlansData) => (
            <PriceCard
              key={plan._id}
              id={plan._id}
              handlePayment={handlePayment}
              features={plan.features}
              name={plan.name}
              price={plan.price}
              videoLimit={plan.videoLimit}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Price;
